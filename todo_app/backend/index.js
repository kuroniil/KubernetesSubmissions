require("dotenv").config();
const express = require("express");
const { Sequelize, QueryTypes } = require("sequelize");

async function main() {
  const app = express();

  app.use(express.json());
  const sequelize = new Sequelize(process.env.DB_URL);

  await sequelize.authenticate();

  try {
    await sequelize.query("SELECT * FROM todos");
  } catch (error) {
    await sequelize.query(
      "CREATE TABLE todos (id SERIAL PRIMARY KEY, content TEXT)",
    );
    await sequelize.query(
      "INSERT INTO todos (content) values ('Learn Kubernetes basics')",
    );
    await sequelize.query(
      "INSERT INTO todos (content) values ('Deploy an application to cluster')",
    );
    await sequelize.query(
      "INSERT INTO todos (content) values ('Configure persistent volumes')",
    );
  }

  app.get("/todos", async (req, res) => {
    const todos = await sequelize.query("SELECT * FROM todos", {
      type: QueryTypes.SELECT,
    });
    res.json(todos);
  });

  app.post("/todos", async (req, res) => {
    const newTodoContent = req.body.content;
    if (newTodoContent.length > 140) {
      console.log("New todo blocked");
      res.status(400).json({ message: "Todo content too long" });
    } else {
      // sql injection here? XD
      const newTodo = await sequelize.query(
        `INSERT INTO todos (content) values ('${newTodoContent}') RETURNING *`,
        { type: QueryTypes.INSERT },
      );
      res.json(newTodo[0]);
    }
  });

  const PORT = parseInt(process.env.BACKEND_PORT);
  app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`);
  });
}

main();
