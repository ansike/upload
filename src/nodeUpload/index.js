const fs = require("fs");
const path = require("path");
const http = require("http");
const FormData = require("form-data");

const readStream = fs.createReadStream(path.resolve(__dirname, "./file.jpeg"));

const form = new FormData();
form.append("file", readStream);

// 可以自己构造http请求
// const newReq = http.request("http://localhost:9001/upload", {
//   method: "POST",
//   headers: form.getHeaders(),
// });

// form.pipe(newReq);

// 也可以直接使用formdata自带的submit发送请求
form.submit(
  {
    host: "localhost",
    port: "9001",
    path: "/upload",
    protocol: "http:",
  },
  (err, res) => {
    if (err) {
      console.log(err);
    }
  }
);
