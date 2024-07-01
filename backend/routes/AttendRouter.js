const AttendanceController = require("../controllers/AttendanceController");
const Authentication = require("../middlewares/Authentication");

const AttendRouter = require("express").Router();

/* routes for /attend */

AttendRouter.post("/", Authentication, AttendanceController.attend);

module.exports = AttendRouter;
