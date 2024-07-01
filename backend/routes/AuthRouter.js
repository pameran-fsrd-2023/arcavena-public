const AuthController = require("../controllers/AuthController");
const Authentication = require("../middlewares/Authentication");

const AuthRouter = require("express").Router();

/* routes for /auth */

AuthRouter.post("/sign-in", AuthController.signIn);
AuthRouter.post("/fsrd/sign-in", AuthController.fsrdSignIn);
AuthRouter.post("/sign-up", AuthController.signUp);
AuthRouter.post("/user-info", Authentication, AuthController.userInfo);
AuthRouter.post("/g-signin", AuthController.gSignIn);

module.exports = AuthRouter;
