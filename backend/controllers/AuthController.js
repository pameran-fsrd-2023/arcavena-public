const { isStringValid, getHashedString } = require("../helpers/bcrypt");
const { getToken } = require("../helpers/jwt");
const { CustomError } = require("../middlewares/ErrorHandler");
const FsrdUser = require("../models/FsrdUser");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "postmessage");

class AuthController {
  static async fsrdSignIn(req, res, next) {
    try {
      const { displayName, microsoftMail, microsoftMailId, username, password } = req.body;

      if (username && password) {
        const existingUser = await FsrdUser.findOne({ username });
        const isCredentialValid = existingUser ? isStringValid(password, existingUser.password) : false;
        if (!isCredentialValid) {
          throw new CustomError(400, "Wrong username or password");
        }

        res.status(200).json({
          id: existingUser._id,
          nim: username.split("@")[0],
          displayName: existingUser.displayName,
          access_token: getToken({ ...existingUser, isFsrd: true }),
        });
      }
      if (microsoftMail && microsoftMailId) {
        const existingUser = await FsrdUser.findOne({ microsoftMail });
        const isCredentialValid = existingUser ? isStringValid(microsoftMailId, existingUser.microsoftMailId) : false;
        if (existingUser && isCredentialValid) {
          await FsrdUser.patchOnline({ _id: existingUser._id });
          return res.status(200).json({
            id: existingUser._id,
            nim: microsoftMail.split("@")[0],
            access_token: getToken({ ...existingUser, isFsrd: true }),
          });
        }
        if (existingUser && !isCredentialValid) {
          throw new CustomError(400, "Microsoft mail is bounded to another account");
        }

        // Validate microsoftMail prefix
        // if (!microsoftMail.startsWith("16823")) {
        //   throw new CustomError(400, "Microsoft mail must start with 16823XXX");
        // }

        //return token when user signUp
        await FsrdUser.register({ displayName, microsoftMail, microsoftMailId });
        const createdUser = await FsrdUser.findOne({ microsoftMail });
        res.status(201).json({
          id: createdUser._id,
          nim: microsoftMail.split("@")[0],
          access_token: getToken({ ...createdUser, isFsrd: true }),
        });
      }

      res.status(400).json("Incomplete data");
    } catch (error) {
      next(error);
    }
  }

  static async signIn(req, res, next) {
    try {
      const { username, displayName, password, microsoftMail, microsoftMailId } = req.body;

      if (!microsoftMail && !username) {
        throw new CustomError(400, "Tolong isi username & password, atau masuk dengan akun sosial media");
      }

      if (password && username) {
        // returns token when user login
        const existingUser = await User.findOne({ username });
        if (existingUser && isStringValid(password, existingUser.password)) {
          await User.patchOnline({ _id: existingUser._id });
          return res.status(200).json({ id: existingUser._id, access_token: getToken(existingUser), displayName: username });
        }
        if (existingUser && !isStringValid(password, existingUser.password)) {
          throw new CustomError(403, "Wrong username/password");
        }
      }

      if (microsoftMailId) {
        // returns token when user login
        const existingUser = await User.findOne({ microsoftMail });
        const isCredentialValid = existingUser ? isStringValid(microsoftMailId, existingUser.microsoftMailId) : false;
        if (existingUser && isCredentialValid) {
          await User.patchOnline({ _id: existingUser._id });
          return res.status(200).json({ id: existingUser._id, access_token: getToken(existingUser) });
        }
        if (existingUser && !isCredentialValid) {
          throw new CustomError(400, "Microsoft mail is bounded to another account");
        }

        //return token when user signUp
        await User.register({ displayName, microsoftMail, microsoftMailId });
        const createdUser = await User.findOne({ microsoftMail });
        return res.status(201).json({ id: createdUser._id, access_token: getToken(createdUser) });
      }

      throw new CustomError(404, "Account not found");
    } catch (error) {
      next(error);
    }
  }

  static async signUp(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password)
        throw new CustomError(400, "Tolong isi username & password, atau masuk dengan akun sosial media");

      // returns token when user login
      const existingUser = await User.findOne({ username });
      const isCredentialValid = existingUser ? isStringValid(password, existingUser.password) : false;
      if (existingUser && isStringValid(password, existingUser.password)) {
        await User.patchOnline({ _id: existingUser._id });
        return res.status(200).json({ id: existingUser._id, access_token: getToken(existingUser), displayName: username });
      }
      if (existingUser && !isCredentialValid) {
        throw new CustomError(400, "Username is taken by another account");
      }

      //return token when user signUp
      await User.register({ username, displayName: username, password });
      const createdUser = await User.findOne({ username });
      return res.status(201).json({ id: createdUser._id, access_token: getToken(createdUser), displayName: username });
    } catch (error) {
      next(error);
    }
  }

  static async userInfo(req, res) {
    try {
      const isFsrd = res.locals.isFsrd;
      const { displayName, _id, nim } = res.locals.user;

      if (isFsrd) {
        res.status(200).json({ displayName, _id, nim });
        return;
      }

      res.status(200).json({ displayName, _id });
    } catch (error) {
      next(error);
    }
  }

  static async gSignIn(req, res, next) {
    try {
      const { gCode } = req.body;

      const { tokens } = await oAuth2Client.getToken(gCode);
      const googleMailId = tokens.id_token;

      const ticket = await oAuth2Client.verifyIdToken({
        idToken: googleMailId,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const { email: googleMail, name: displayName } = payload;

      // returns token when user login
      const existingUser = await User.findOne({ googleMail });
      const isCredentialValid = existingUser ? isStringValid(googleMail, existingUser.googleMailId) : false;

      if (existingUser && isCredentialValid) {
        await User.patchOnline({ _id: existingUser._id });
        return res.status(200).json({ id: existingUser._id, access_token: getToken(existingUser), displayName });
      }
      if (existingUser && !isCredentialValid) {
        throw new CustomError(400, "Gmail is bounded to another account");
      }

      //return token when user signUp
      await User.register({ displayName, googleMail, googleMailId: googleMail });
      const createdUser = await User.findOne({ googleMail });
      return res.status(201).json({ id: createdUser._id, access_token: getToken(createdUser), displayName });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AuthController;
