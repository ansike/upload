const fs = require("fs");
const path = require("path");
const http = require("http");
const FormData = require("form-data");

const readStream = fs.createReadStream(path.resolve(__dirname, "./file.jpeg"));

const form = new FormData();
form.append("file", readStream);

const newReq = http.request("http://localhost:9001/upload", {
  method: "POST",
  headers: form.getHeaders(),
});

form.pipe(newReq);
