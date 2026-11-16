import express from "express";
const app = express();

let counter = 0;

app.get("/pingpong", (request, response) => {
  response.send(`pong ${counter++}`);
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
