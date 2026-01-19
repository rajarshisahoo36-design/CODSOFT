const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Links this quiz to the user who created it
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [
          {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true, default: false },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;