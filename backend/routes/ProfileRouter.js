const FsrdUserController = require("../controllers/FsrdUserController");
const UserController = require("../controllers/UserController");
const Authentication = require("../middlewares/Authentication");
const MulterUpload = require("../middlewares/MulterUpload");

const ProfileRouter = require("express").Router();

/* routes for /profile */
ProfileRouter.put("/", Authentication, UserController.put);
ProfileRouter.put(
  "/fsrd/:nim",
  Authentication,
  MulterUpload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "karya1", maxCount: 1 },
    { name: "karya2", maxCount: 1 },
    { name: "karya3", maxCount: 1 },
    { name: "karya4", maxCount: 1 },
    { name: "karya5", maxCount: 1 },
  ]),
  FsrdUserController.put
);

ProfileRouter.get("/fsrd", FsrdUserController.getAllNIM);
ProfileRouter.get("/fsrd/:nim", FsrdUserController.getOne);

module.exports = ProfileRouter;
