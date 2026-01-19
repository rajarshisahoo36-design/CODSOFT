const express = require("express");
const { createQuiz, getQuizzes, getQuizById } = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(getQuizzes)
  .post(protect, createQuiz);

// --- NEW ROUTE ---
router.route("/:id").get(getQuizById); 

module.exports = router;