const { CustomError } = require("../middlewares/ErrorHandler");
const Attendance = require("../models/Attendance");

class AttendanceController {
  static async attend(req, res, next) {
    try {
      const isAdmin = res.locals.isFsrd;
      if (!isAdmin) {
        throw new CustomError(403, "Unauthorized");
      }

      const { TicketId, namaPengunjung } = req.body;

      if (!TicketId || !namaPengunjung) {
        throw new CustomError(400, "Invalid POST request");
      }

      const existingAttendance = await Attendance.findOne({ TicketId, namaPengunjung });
      if (existingAttendance) {
        res.status(200).json(existingAttendance);
        return;
      }

      const newAttendance = await Attendance.create({
        TicketId,
        namaPengunjung,
      });

      res.status(200).json(newAttendance);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AttendanceController;
