const bcrypt = require("bcryptjs");

const getHashedString = (plainString) => {
  return plainString ? bcrypt.hashSync(plainString, bcrypt.genSaltSync(10)) : "";
};

const isStringValid = (plainString, hashedString) => {
  return bcrypt.compareSync(plainString, hashedString);
};

module.exports = { getHashedString, isStringValid };
