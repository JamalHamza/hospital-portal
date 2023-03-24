const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const genereteteToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// ! Hash token
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token.toString()).digest('hex');
};

module.exports = {
  genereteteToken,
  hashToken
};
