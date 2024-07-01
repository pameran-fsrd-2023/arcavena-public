class CustomError {
  constructor(statusCode, msg) {
    this.statusCode = statusCode;
    this.msg = msg;
  }
}

const ErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json(err.msg);
  } else {
    console.error(err);
    res.status(500).json("INTERNAL SERVER ERROR");
  }
};

module.exports = { CustomError, ErrorHandler };
