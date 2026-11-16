import dotenv from "dotenv";
import express from "express";
import { readFileSync } from "node:fs";
dotenv.config();
const app = express();

app.get("/", (request, response) => {
  const randString = readFileSync("/usr/src/app/files/data.txt", "utf8");
  const counter = readFileSync("/usr/src/app/counter/counter.txt", "utf8");
  response.send(randString + "\n" + `Ping / Pongs: ${counter}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
