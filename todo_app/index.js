require("dotenv").config();
const express = require("express");
const fs = require("fs");
const app = express();

app.use("/files", express.static("/usr/src/app/files"));

async function getImage(override) {
  if (!override && fs.existsSync("/usr/src/app/files/image.jpg")) {
    return;
  }
  const response = await fetch("https://picsum.photos/1200");

  const buffer = Buffer.from(await response.arrayBuffer());

  fs.writeFileSync("/usr/src/app/files/image.jpg", buffer);
}

app.get("/", (request, response) => {
  response.send(`
    <div>
      <h1>Todo app</h1>
      <img src="/files/image.jpg" />
    </div>
    `);
});

getImage(false);
setInterval(() => getImage(true), 600000);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
