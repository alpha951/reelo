const express = require("express");
const router = express.Router();

const { questionController } = require("../../controllers");
const {
  validateGetRequest,
} = require("../../middlewares/questions.middlewares");

router.get("/", validateGetRequest, questionController.getQuestions);

module.exports = router;
