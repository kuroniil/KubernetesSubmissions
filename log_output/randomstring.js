import { v4 as uuid } from "uuid";
import fs from "node:fs";

let randomstring = uuid();

setInterval(() => {
  const timestamp = new Date().toISOString();
  const line = `${timestamp}: ${randomstring}`;
  fs.writeFileSync("/usr/src/app/files/data.txt", line);
}, 5000);
