const UserExplored = require("../models/UserExplored");

class UserExploreController {
  // Retrieve the exploration progress of the authenticated user
  static async getMine(req, res, next) {
    try {
      const UserId = res.locals.user._id;
      const userExplored = await UserExplored.findByUserId(UserId);

      res.status(200).json(userExplored);
    } catch (error) {
      next(error);
    }
  }

  // Update the exploration progress of the authenticated user
  static async updateMine(req, res, next) {
    try {
      const UserId = res.locals.user._id;
      const { progress } = req.body;

      let userExplored = await UserExplored.findByUserId(UserId);

      if (!userExplored) {
        userExplored = await UserExplored.create({ progress, UserId });
      } else {
        // Merge new progress with existing progress
        const updatedProgress = { ...userExplored.progress, ...progress };
        userExplored = await UserExplored.updateById(userExplored._id, { progress: updatedProgress });
      }

      res.status(200).json(userExplored);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserExploreController;
