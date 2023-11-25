const express = require("express");
const router = express.Router();

const { questionController } = require("../../controllers");
const {
  validateGetRequest,
} = require("../../middlewares/questions.middlewares");

router.post("/", validateGetRequest, questionController.getQuestions);

module.exports = router;
