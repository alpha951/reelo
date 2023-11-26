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
    ErrorResponse.explanation = "hardPercentage not found in the request body";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (req.body.totalMarks < 0) {
    ErrorResponse.message = "Something went wrong while getting the questions";
    ErrorResponse.explanation = "totalMarks cannot be negative";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (
    req.body.easyPercentage +
      req.body.mediumPercentage +
      req.body.hardPercentage !==
    100
  ) {
    ErrorResponse.message = "Something went wrong while getting the questions";
    ErrorResponse.explanation = "Percentage should add up to 100";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (
    (req.body.easyPercentage < 0) |
    (req.body.mediumPercentage < 0) |
    (req.body.hardPercentage < 0)
  ) {
    ErrorResponse.message = "Something went wrong while getting the questions";
    ErrorResponse.explanation = "Percentage cannot be negative";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

module.exports = {
  validateGetRequest,
};
