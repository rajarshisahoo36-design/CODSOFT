import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuizPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", options: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }] }
  ]);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) navigate("/login");
  }, [navigate]);

  // Handlers (Same logic as before)
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswer = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.forEach(opt => opt.isCorrect = false);
    newQuestions[qIndex].options[oIndex].isCorrect = true;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: [{ text: "", isCorrect: false }, { text: "", isCorrect: false }] }]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        await axios.post("http://localhost:5000/api/quizzes", { title, description, questions }, config);
        alert("Quiz Created Successfully!");
        navigate("/");
    } catch (error) {
        console.error(error);
        alert("Error Creating Quiz");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Create New Quiz</h1>
          <button onClick={() => navigate("/")} className="text-slate-500 hover:text-slate-800">Cancel</button>
        </div>

        <form onSubmit={submitHandler} className="space-y-8">
          
          {/* Section 1: Quiz Details */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Quiz Details</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Quiz Title</label>
                <input
                  type="text"
                  placeholder="e.g. JavaScript Mastery"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description (Optional)</label>
                <textarea
                  placeholder="What is this quiz about?"
                  rows="2"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Questions */}
          <div className="space-y-6">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 relative group">
                <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-600 font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl text-sm">
                  Q{qIndex + 1}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Question Text</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none font-medium"
                    placeholder="Type your question here..."
                    value={q.questionText}
                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Answer Options (Select Correct)</p>
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-3">
                      <input
                        type="radio"
                        name={`correct-${qIndex}`}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                        checked={option.isCorrect}
                        onChange={() => handleCorrectAnswer(qIndex, oIndex)}
                        required
                      />
                      <input
                        type="text"
                        placeholder={`Option ${oIndex + 1}`}
                        className={`flex-1 px-3 py-2 border rounded-md outline-none text-sm transition ${option.isCorrect ? "border-green-500 bg-green-50" : "border-slate-300 focus:border-indigo-500"}`}
                        value={option.text}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12">
            <button
              type="button"
              onClick={addQuestion}
              className="text-indigo-600 font-bold hover:text-indigo-800 transition flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-50"
            >
              <span className="text-xl">+</span> Add Question
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition transform hover:-translate-y-0.5"
            >
              Publish Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizPage;