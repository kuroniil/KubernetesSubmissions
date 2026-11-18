require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const todos = [
  { id: 0, content: "Learn Kubernetes basics" },
  { id: 1, content: "Deploy an application to cluster" },
  { id: 2, content: "Configure persistent volumes" },
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = { ...req.body, id: 1000000 * Math.random() };
  todos.push(newTodo);
  res.json(newTodo);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
