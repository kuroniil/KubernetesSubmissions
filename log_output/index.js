import { v4 as uuid } from "uuid";

let randomstring = uuid();

setInterval(() => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${randomstring}`);
}, 5000);
