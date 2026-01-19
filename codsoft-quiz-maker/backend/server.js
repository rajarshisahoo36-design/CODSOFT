const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes'); // <--- IMPORT THIS
const quizRoutes = require("./routes/quizRoutes"); // <--- IMPORT THIS

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- ADD THIS LINE ---
app.use('/api/users', userRoutes);

// ... inside app.use section
app.use("/api/users", userRoutes);
app.use("/api/quizzes", quizRoutes); // <--- ADD THIS

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));