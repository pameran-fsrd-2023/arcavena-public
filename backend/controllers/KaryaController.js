const FsrdUser = require("../models/FsrdUser");
const Karya = require("../models/Karya");

class KaryaController {
  static async getAll(req, res, next) {
    try {
      const { prodi, filterName } = req.query;
      const data = await Karya.findAllRandom({ prodi, username: filterName });

      for (let el of data) {
        const user = await FsrdUser.findOne({ _id: el.UserId });
        if (user) {
          const { nim, displayName } = user;
          el.user = {
            nim,
            displayName,
          };
        }
      }

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = KaryaController;
