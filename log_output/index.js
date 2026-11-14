import { v4 as uuid } from "uuid";
import dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();

let randomstring = uuid();

app.get("/", (request, response) => {
  const timestamp = new Date().toISOString();
  response.send(`${timestamp}: ${randomstring}`);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
