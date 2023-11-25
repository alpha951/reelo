const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { Logger } = require("../config");
const { QuestionPaper } = require("../services");

async function getQuestions(req, res) {
  try {
    const {
      totalMarks,
      easyPercentage,
      mediumPercentage,
      difficultPercentage,
    } = req.body;
    const questions = await QuestionPaper.getQuestions({
      totalMarks,
      easy: easyPercentage,
      medium: mediumPercentage,
      hard: difficultPercentage,
    });
    SuccessResponse.data = questions;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    Logger.error(error);
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  getQuestions,
};
