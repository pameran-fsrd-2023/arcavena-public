const jwt = require("jsonwebtoken");
const { CustomError } = require("../middlewares/ErrorHandler");
const JWT_SECRET = process.env.JWT_SECRET ?? "VHakjJBKASDKUasd87%sa&*d7";
const EXPIRATION_TIME = 20 * 60 * 60; // 20 hours in seconds

const getToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRATION_TIME });
};

const getPayload = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new CustomError(400, "Token expired");
    } else {
      throw new CustomError(400, "Invalid token");
    }
  }
};

module.exports = { getToken, getPayload };
