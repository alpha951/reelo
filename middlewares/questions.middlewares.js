const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

function validateGetRequest(req, res, next) {
  if (!req.body.totalMarks) {
    ErrorResponse.message = "Something went wrong while getting the questions";
    ErrorResponse.explanation = "totalMarks not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.easyPercentage) {
    ErrorResponse.message = "Something went wrong while getting the questions";
    ErrorResponse.explanation = "easyPercentage not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.mediumPercentage) {
    ErrorResponse.message = "Something went wrong while getting the questions";
    ErrorResponse.explanation =
      "mediumPercentage not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!req.body.hardPercentage) {
    ErrorResponse.message = "Something went wrong while getting the questions";
    ErrorResponse.explanation =
      "hardPercentage not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

module.exports = {
  validateGetRequest,
};
