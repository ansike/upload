const fs = require("fs");
const path = require("path");
const http = require("http");

const boundaryKey = `----${new Date().getTime()}`;

// 可以自己构造http请求
const newReq = http.request("http://localhost:9001/upload", {
  method: "POST",
  headers: {
    "content-type": `multipart/form-data; boundary=${boundaryKey}`,
  },
});
newReq.write(
  `--${boundaryKey}\r\nContent-Disposition: form-data; name=file; filename=newfile-${new Date().getTime()}.jpeg\r\nContent-Type: image/png\r\n\r\n`
);
const readStream = fs.createReadStream(path.resolve(__dirname, `./file.jpeg`));
readStream.pipe(newReq, { end: false });
readStream.on("end", () => {
  newReq.end(`\r\n--${boundaryKey}--`);
});

// ====================== 可以自己构造http请求
// const fs = require("fs");
// const path = require("path");
// const http = require("http");
// const FormData = require("form-data");

// const readStream = fs.createReadStream(path.resolve(__dirname, "./file.jpeg"));

// const form = new FormData();
// form.append("file", readStream);

// const newReq = http.request("http://localhost:9001/upload", {
//   method: "POST",
//   headers: form.getHeaders(),
// });

// form.pipe(newReq);

// ======================  也可以直接使用formdata自带的submit发送请求
// const fs = require("fs");
// const path = require("path");
// const http = require("http");
// const FormData = require("form-data");

// const readStream = fs.createReadStream(path.resolve(__dirname, "./file.jpeg"));

// const form = new FormData();
// form.append("file", readStream);
// form.submit(
//   {
//     host: "localhost",
//     port: "9001",
//     path: "/upload",
//     protocol: "http:",
//   },
//   (err, res) => {
//     if (err) {
//       console.log(err);
//     }
//   }
// );
