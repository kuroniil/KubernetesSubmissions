import express from "express";
import { readFileSync, writeFileSync } from "node:fs";

const app = express();

try {
  readFileSync("/usr/src/app/counter/counter.txt", "utf8");
} catch (err) {
  writeFileSync("/usr/src/app/counter/counter.txt", "0");
}

app.get("/pingpong", (request, response) => {
  let counter = parseInt(
    readFileSync("/usr/src/app/counter/counter.txt", "utf8"),
  );
  writeFileSync("/usr/src/app/counter/counter.txt", `${++counter}`);
  response.send(`pong ${counter}`);
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
