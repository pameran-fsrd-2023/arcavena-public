const { CustomError } = require("../middlewares/ErrorHandler");
const FsrdUser = require("../models/FsrdUser");
const User = require("../models/User");

class GameController {
  static async put(req, res, next) {
    try {
      const { _id } = res.locals.user;
      const { id } = req.params;

      const userData = await User.findOne({ _id });
      const fsrdUserData = await FsrdUser.findOne({ _id });

      if (!userData && !fsrdUserData) {
        throw new CustomError(404, "User not found");
      }

      if (userData) {
        if (!Array.isArray(userData.capturedArea)) {
          userData.capturedArea = [];
        }
        userData.capturedArea.push(id);

        await userData.save();
      } else if (fsrdUserData) {
        if (!Array.isArray(fsrdUserData.capturedArea)) {
          fsrdUserData.capturedArea = [];
        }
        fsrdUserData.capturedArea.push(id);

        await fsrdUserData.save();
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GameController;
