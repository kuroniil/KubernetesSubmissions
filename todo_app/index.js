require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const distPath = path.join(__dirname, "frontend/dist");

app.use("/files", express.static("/usr/src/app/files"));

app.use(express.static(distPath));

async function getImage(override) {
  if (!override && fs.existsSync("/usr/src/app/files/image.jpg")) {
    return;
  }
  const response = await fetch("https://picsum.photos/1200");

  const buffer = Buffer.from(await response.arrayBuffer());

  fs.writeFileSync("/usr/src/app/files/image.jpg", buffer);
}

app.get("/", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

getImage(false);
setInterval(() => getImage(true), 600000);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
