class CustomError extends Error {
    constructor({ statusCode, message }) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
  }
  
  //error handling function that catches the errors and so that the app does not crash in production
  const handleError = (err, req, res, next) => {
    let { statusCode, message } = err;
  
    console.error(message);
  
    if (!statusCode) statusCode = 500;
  
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
    });
  };
  
  module.exports = {
    handleError,
    CustomError,
  };