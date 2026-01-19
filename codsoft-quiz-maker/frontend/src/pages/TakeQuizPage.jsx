import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TakeQuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  // Loading State
  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
          <p className="text-gray-500 font-medium">Loading Quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header Progress Bar */}
          <div className="bg-gray-100 h-2 w-full">
            <div 
              className="bg-indigo-600 h-2 transition-all duration-300 ease-out"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="p-8 sm:p-10">
            {showScore ? (
              // --- RESULT SECTION ---
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-indigo-100 mb-6">
                  <span className="text-4xl">🏆</span>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Quiz Completed!</h2>
                <p className="text-gray-500 mb-8">You have successfully finished the quiz.</p>
                
                <div className="bg-gray-50 rounded-xl p-6 mb-8 inline-block w-full max-w-sm border border-gray-200">
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wide mb-1">Your Score</p>
                    <p className="text-5xl font-extrabold text-indigo-600">
                        {score} <span className="text-2xl text-gray-400">/ {quiz.questions.length}</span>
                    </p>
                </div>

                <div>
                    <button
                    onClick={() => navigate("/")}
                    className="w-full sm:w-auto bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition shadow-lg transform hover:-translate-y-0.5"
                    >
                    Back to Dashboard
                    </button>
                </div>
              </div>
            ) : (
              // --- QUESTION SECTION ---
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                        {quiz.title}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Question {currentQuestion + 1} of {quiz.questions.length}
                    </p>
                  </div>
                  <span className="mt-2 sm:mt-0 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                    Category: General
                  </span>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-medium text-gray-800 leading-relaxed">
                        {quiz.questions[currentQuestion].questionText}
                    </h2>
                </div>

                <div className="space-y-4">
                  {quiz.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerOptionClick(option.isCorrect)}
                      className="group w-full text-left p-5 rounded-xl border-2 border-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200 flex items-center"
                    >
                      <span className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200 mr-4">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-gray-700 font-medium group-hover:text-indigo-900">
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TakeQuizPage;