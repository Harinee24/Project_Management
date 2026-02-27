const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = "project_secret";

mongoose.connect("mongodb://127.0.0.1:27017/projectDashboardDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "user" } 
});

const boardSchema = new mongoose.Schema({
  title: String,
  lists: [
    {
      title: String,
      tasks: [
        {
          text: String
        }
      ]
    }
  ]
});

const User = mongoose.model("User", userSchema);
const Board = mongoose.model("Board", boardSchema);

// ================= Middleware =================
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No Token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// ================= Auth =================
app.post("/register", async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...req.body, password: hashed });
  await user.save();
  res.json({ message: "Registered" });
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ message: "User not found" });

  const valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) return res.json({ message: "Wrong password" });

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET);
  res.json({ token });
});

// ================= Boards =================

app.post("/board", verifyToken, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin only" });

  const board = new Board({ title: req.body.title, lists: [] });
  await board.save();
  res.json(board);
});

app.get("/boards", async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
});

app.post("/list/:boardId", verifyToken, async (req, res) => {
  const board = await Board.findById(req.params.boardId);
  board.lists.push({ title: req.body.title, tasks: [] });
  await board.save();
  res.json(board);
});

app.post("/task/:boardId/:listIndex", verifyToken, async (req, res) => {
  const board = await Board.findById(req.params.boardId);
  board.lists[req.params.listIndex].tasks.push({ text: req.body.text });
  await board.save();
  res.json(board);
});

app.put("/move/:boardId", verifyToken, async (req, res) => {
  const { lists } = req.body;
  await Board.findByIdAndUpdate(req.params.boardId, { lists });
  res.json({ message: "Updated" });
});

app.listen(5000, () => console.log("Server running on 5000"));
