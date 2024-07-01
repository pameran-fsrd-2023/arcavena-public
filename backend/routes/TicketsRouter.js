const TicketController = require("../controllers/TicketController");
const Authentication = require("../middlewares/Authentication");

const TicketsRouter = require("express").Router();

/* routes for /tickets */

TicketsRouter.post("/", Authentication, TicketController.create);
TicketsRouter.get("/mine", Authentication, TicketController.getMine);
TicketsRouter.delete("/mine", Authentication, TicketController.deleteMine);

module.exports = TicketsRouter;
