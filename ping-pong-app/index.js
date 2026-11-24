import { Sequelize, QueryTypes } from "sequelize";
import express from "express";

const app = express();

const sequelize = new Sequelize(
  "postgresql://postgres:passwd@postgres-svc:5432/postgres",
);

await sequelize.authenticate();
let counter = -1;
try {
  counter = await sequelize.query("SELECT value FROM counter WHERE id = 1");
} catch (err) {
  counter = 0;
  await sequelize.query("CREATE TABLE counter (id INTEGER, value INTEGER)");
  await sequelize.query("INSERT INTO counter (id, value) values (1, 1)");
}

app.get("/", async (request, response) => {
  await sequelize.query("UPDATE counter SET value = value + 1 WHERE id = 1");
  counter = await sequelize.query("SELECT value FROM counter WHERE id = 1", {
    type: QueryTypes.SELECT,
  });
  response.send(`pong ${counter[0].value}`);
});

app.get("/pings", async (request, response) => {
  counter = await sequelize.query("SELECT value FROM counter WHERE id = 1", {
    type: QueryTypes.SELECT,
  });
  response.send(`${counter[0].value}`);
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
