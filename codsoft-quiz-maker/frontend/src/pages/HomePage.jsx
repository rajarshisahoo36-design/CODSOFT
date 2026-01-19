import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    } else {
      const fetchQuizzes = async () => {
        try {
          const { data } = await axios.get("http://localhost:5000/api/quizzes");
          setQuizzes(data);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
      fetchQuizzes();
    }
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">QuizMaster</h1>
            </div>
            <button
              onClick={logoutHandler}
              className="text-sm font-medium text-slate-500 hover:text-red-600 transition-colors"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Hero Section */}
        <div className="bg-indigo-600 rounded-2xl p-8 mb-12 shadow-xl flex flex-col md:flex-row items-center justify-between text-white">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Ready to challenge yourself?</h2>
            <p className="text-indigo-100 max-w-lg">Create your own quizzes to test others, or take a quiz to sharpen your skills.</p>
          </div>
          <button
            onClick={() => navigate("/create-quiz")}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold shadow-sm hover:bg-indigo-50 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            + Create New Quiz
          </button>
        </div>

        {/* Quiz Grid Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-indigo-500 rounded-full"></div>
          <h3 className="text-xl font-bold text-slate-800">Available Quizzes</h3>
        </div>

        {/* Content Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
            <p className="text-slate-500 text-lg">No quizzes found. Be the first to create one!</p>
          </div>
        ) : (
          /* The Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="p-6 flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 truncate">{quiz.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3">{quiz.description || "No description provided."}</p>
                </div>
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                    {quiz.questions ? quiz.questions.length : 0} Questions
                  </span>
                  <button 
                    onClick={() => navigate(`/take-quiz/${quiz._id}`)}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
                  >
                    Start Quiz <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;