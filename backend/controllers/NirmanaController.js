const Nirmana = require("../models/Nirmana");

class NirmanaController {
  // Get one random Nirmana
  static async getOneRandom(req, res, next) {
    try {
      const data = await Nirmana.getOneRandom();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // Get Nirmana by User ID
  static async getOneMine(req, res, next) {
    try {
      const userId = res.locals.user._id;
      const data = await Nirmana.getByUserId(userId);

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  // Update Nirmana by User ID
  static async updateByMine(req, res, next) {
    try {
      const userId = res.locals.user._id;
      const { data } = req.body;
      const existingNirmana = await Nirmana.getByUserId(userId);

      if (existingNirmana) {
        const updatedNirmana = await Nirmana.updateById(existingNirmana._id, { data });
        res.status(200).json(updatedNirmana);
      } else {
        const newNirmana = await Nirmana.create({ UserId: userId, data });
        res.status(201).json(newNirmana);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NirmanaController;
