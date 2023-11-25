const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app.error");
const fs = require("fs");
const questionsPath = path.join(__dirname, "..", "/questions.json");

async function loadQuestions(filePath) {
  try {
    const questionStore = await fs.readFile(filePath, "utf8");
    const parsedQuestion = JSON.parse(questionStore);
    return parsedQuestion;
  } catch (error) {
    throw new AppError(
      "Cannot load questions !",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getQuestions(data) {
  try {
    const allQuestions = await loadQuestions(questionsPath);
    const { totalMarks, easy, medium, hard } = data;
    let easyMarks = totalMarks * (easy / 100),
      mediumMarks = totalMarks * (medium / 100),
      hardMarks = totalMarks * (hard / 100);
    const questions = {};
    let marks = 0;
    let easyQuestions = [],
      mediumQuestions = [],
      hardQuestions = [];

    for (let question of allQuestions) {
      if (marks >= totalMarks) break;
      let isSelected = false;
      if (question.difficulty === "easy" && easyMarks >= question.marks) {
        easyQuestions.push(question);
        easyMarks -= question.marks;
        isSelected = true;
      } else if (
        question.difficulty === "medium" &&
        mediumMarks >= question.marks
      ) {
        mediumQuestions.push(question);
        mediumMarks -= question.marks;
        isSelected = true;
      } else if (
        question.difficulty === "hard" &&
        hardMarks >= question.marks
      ) {
        hardQuestions.push(question);
        hardMarks -= question.marks;
        isSelected = true;
      }
      if (isSelected) {
        marks += question.marks;
      }
    }

    if (easyMarks > 0)
      throw new AppError(
        "Not enough easy questions !",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    if (mediumMarks > 0)
      throw new AppError(
        "Not enough medium questions !",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    if (hardMarks > 0)
      throw new AppError(
        "Not enough hard questions !",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    if (marks != totalMarks)
      throw new AppError(
        "Not enough questions, requested combination can't fulfilled !",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    questions.easy = easyQuestions;
    questions.medium = mediumQuestions;
    questions.hard = hardQuestions;
    return questions;
  } catch (error) {
    throw new AppError(
      "Cannot get  questions !",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  getQuestions,
};
