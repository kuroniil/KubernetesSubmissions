require("dotenv").config();
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  response.send(`
      <h1>Hello World!</h1>
      <div>
        input something
        <input></input>
      </div>
    `);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
