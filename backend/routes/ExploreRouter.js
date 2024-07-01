const UserExploreController = require("../controllers/UserExploreController");
const Authentication = require("../middlewares/Authentication");

const ExploreRouter = require("express").Router();

/* routes for /explore */

ExploreRouter.get("/mine", Authentication, UserExploreController.getMine);
ExploreRouter.put("/mine", Authentication, UserExploreController.updateMine);

module.exports = ExploreRouter;
