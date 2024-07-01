const { getPayload } = require("../helpers/jwt");
const FsrdUser = require("../models/FsrdUser");
const User = require("../models/User");
const { CustomError } = require("./ErrorHandler");

const Authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw new CustomError(403, "Please re-login");

    const tokenIdentity = getPayload(access_token);
    if (!tokenIdentity) throw new CustomError(403, "Please re-login");

    res.locals.isFsrd = tokenIdentity.isFsrd;

    if (tokenIdentity.isFsrd) {
      const requestAccount = await FsrdUser.findOne({ _id: tokenIdentity._id });
      if (
        !requestAccount ||
        tokenIdentity.microsoftMail !== requestAccount.microsoftMail ||
        tokenIdentity.microsoftMailId !== requestAccount.microsoftMailId
      ) {
        throw new CustomError(403, "Please re-login");
      }
      res.locals.user = requestAccount;
    } else {
      const requestAccount = await User.findOne({ _id: tokenIdentity._id });

      if (
        !requestAccount ||
        tokenIdentity.password !== requestAccount.password ||
        tokenIdentity.displayName !== requestAccount.displayName
      ) {
        throw new CustomError(403, "Please re-login");
      }
      if (!requestAccount.displayName) {
        requestAccount.displayName = username;
      }
      requestAccount.displayName =
        requestAccount.displayName.length > 10 ? requestAccount.displayName.slice(0, 10) + "..." : requestAccount.displayName;

      res.locals.user = requestAccount;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = Authentication;
