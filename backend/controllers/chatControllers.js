const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

// * -------------------------------------------------
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  // ! If userId is undefined
  if (!userId) {
    console.log('userId is undefined');
    res.status(400);
    throw new Error('Something went wrong');
  }
  // ! Find chat --------------------
  let isChat = await Chat.find({
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate('users', '-password')
    .populate('lastMessage');

  // ! -----------------------------
  isChat = await User.populate(isChat, {
    path: 'latestMessage.sender',
    select: 'name pic email',
  });
  // ! isChat exists
  if (isChat.length > 0) {
    res.status(200);
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: 'sender',
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        'users',
        '-password'
      );
      res.status(201).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// * ------------------------------------------------
const fetchChats = asyncHandler(async (req, res) => {
  try {
    let results = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage');

    results = await User.populate(results, {
      path: 'latestMessage.sender',
      select: 'name, pic, email',
    });
    res.status(200).send(results);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// * --------------------------------------------------
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'name pic email')
      .populate('chat');
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// * --------------------------------------------------
const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  // ! Validation
  if (!content || !chatId) {
    console.log('Invalid data passed into request');
    res.status(400);
    throw new Error('Invalid data passed into request');
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    // ! Get the Message Model -------------
    let message = await Message.create(newMessage);
    // ! Get the sender (name, pic) --------
    message = await message.populate('sender', 'name pic ');
    // ! Get the chat details --------------
    message = await message.populate('chat');
    // ! Get the the users for this chat ---
    message = await User.populate(message, {
      path: 'chat.users',
      select: 'name pic email',
    });
    // ! Update LatestMessage ---------
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { accessChat, fetchChats, sendMessage, allMessages };
