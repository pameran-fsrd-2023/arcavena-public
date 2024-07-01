const User = require("../models/User");

class UserController {
  static async put(req, res, next) {
    try {
      const { displayName, password, prodi, socialMedia, profilePicUrl, karya1Id, karya2Id, karya3Id, karya4Id } = req.body;
      const currentUser = res.locals.user;
      console.log({ body: req.body, currentUser });

      // await User.update({
      //   _id: currentUser._id,
      //   displayName,
      //   password,
      //   prodi,
      //   socialMedia,
      //   profilePicUrl,
      //   karya1Id,
      //   karya2Id,
      //   karya3Id,
      //   karya4Id,
      // });
      console.log(currentUser);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = UserController;
