const NirmanaController = require("../controllers/NirmanaController");
const Authentication = require("../middlewares/Authentication");

const NirmanasRouter = require("express").Router();

/* routes for /nirmanas */

NirmanasRouter.get("/one", NirmanaController.getOneRandom);
NirmanasRouter.get("/mine", Authentication, NirmanaController.getOneMine);
NirmanasRouter.put("/mine", Authentication, NirmanaController.updateByMine);

module.exports = NirmanasRouter;
