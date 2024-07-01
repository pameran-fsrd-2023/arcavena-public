const { CustomError } = require("../middlewares/ErrorHandler");
const Ticket = require("../models/Tiket");

class TicketController {
  static async create(req, res, next) {
    try {
      const UserId = res.locals.user._id;
      const { jumlahPengunjung, pengunjungs, sesiDay1, sesiDay2 } = req.body;

      const existingTicket = await Ticket.findOne({ UserId });
      if (existingTicket) {
        throw new CustomError(400, "User already has a ticket");
      }

      await Ticket.create({ UserId, jumlahPengunjung, pengunjungs, sesiDay1, sesiDay2 });
      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }

  static async getMine(req, res, next) {
    try {
      const UserId = res.locals.user._id;

      const data = await Ticket.findOne({ UserId });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async deleteMine(req, res, next) {
    try {
      const UserId = res.locals.user._id;

      const ticket = await Ticket.delete({ UserId });
      if (!ticket) {
        throw new CustomError(404, "Ticket not found");
      }

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TicketController;
