const AuthRouter = require("./AuthRouter");
const ProfileRouter = require("./ProfileRouter");
const path = require("path");
const TicketsRouter = require("./TicketsRouter");
const KaryaRouter = require("./KaryaRouter");
const ExploreRouter = require("./ExploreRouter");
const NirmanasRouter = require("./NirmanaRouter");
const AttendRouter = require("./AttendRouter");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Running..");
});

// Define a route to serve uploaded files
router.get("/uploads/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../public/uploads", fileName);

  // Serve the file using sendFile
  res.sendFile(filePath);
});

router.use("/auth", AuthRouter);
router.use("/profile", ProfileRouter);
router.use("/tickets", TicketsRouter);
router.use("/karyas", KaryaRouter);
router.use("/explore", ExploreRouter);
router.use("/nirmanas", NirmanasRouter);
router.use("/attend", AttendRouter);

module.exports = router;
