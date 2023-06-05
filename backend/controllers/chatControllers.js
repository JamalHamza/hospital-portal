const asyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

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
const fetchChats = (asyncHandler = async (req, res) => {});

module.exports = { accessChat, fetchChats };
