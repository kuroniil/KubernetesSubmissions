import dotenv from "dotenv";
import express from "express";
import { readFileSync } from "node:fs";
dotenv.config();
const app = express();

app.get("/", async (request, response) => {
  const randString = readFileSync("/usr/src/app/files/data.txt", "utf8");
  const res = await fetch("http://ping-pong-app-svc:2346/pings");
  const counter = await res.text();
  response.send(randString + "\n" + `Ping / Pongs: ${counter}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
