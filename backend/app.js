require("dotenv").config();

const { rateLimit } = require("express-rate-limit");
const cors = require("cors");
const express = require("express");
const router = require("./routes");
const { MongoConnect } = require("./configs/MongoConnect");
const { ErrorHandler, CustomError } = require("./middlewares/ErrorHandler");
const app = express();

const port = process.env.PORT ?? 4000;

//Allow origins
const allowedOrigins = process.env.NODE_ENV === "dev" ? ["http://localhost:3000","https://arcavena.com"] : ["https://arcavena.com"];
// app.use(cors());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        console.log(`origin ${origin} accessed on ${new Date().toDateString()}`);
        callback(null, true);
      } else {
        console.log(origin, "NOT ALLOWED BY CORS");
        callback(new CustomError(403, "Not allowed by CORS"));
      }
    },
  })
);
//app.use(cors());
/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
*/
//rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "dev" ? 999999999 : 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routing and error handling
app.use(router);
app.use(ErrorHandler);
app.use((req, res) => {
  res.status(404).json("NOT FOUND");
});

(async () => {
  try {
    await MongoConnect();
    app.listen(port, (_) => console.log(`App is listening at port ${port}`));
  } catch (err) {
    console.log(err ?? `Failed to connect to mongodb`);
  }
})();
