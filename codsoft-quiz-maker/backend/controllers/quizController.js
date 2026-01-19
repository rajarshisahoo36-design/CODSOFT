const Quiz = require("../models/quizModel");

// @desc    Create a new quiz
// @route   POST /api/quizzes
// @access  Private
const createQuiz = async (req, res) => {
  const { title, description, questions } = req.body;

  if (!title || !questions || questions.length === 0) {
    res.status(400);
    throw new Error("Please provide a title and at least one question.");
  }

  const quiz = new Quiz({
    user: req.user._id,
    title,
    description,
    questions,
  });

  const createdQuiz = await quiz.save();
  res.status(201).json(createdQuiz);
};

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find({});
  res.json(quizzes);
};

// --- NEW FUNCTION ---
// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);

  if (quiz) {
    res.json(quiz);
  } else {
    res.status(404);
    throw new Error("Quiz not found");
  }
};

// Make sure to export the new function!
module.exports = { createQuiz, getQuizzes, getQuizById };