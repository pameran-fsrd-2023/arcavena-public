const KaryaController = require("../controllers/KaryaController");

const KaryaRouter = require("express").Router();

/* routes for /karyas */

KaryaRouter.get("/", KaryaController.getAll);

module.exports = KaryaRouter;
