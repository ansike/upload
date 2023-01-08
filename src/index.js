const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((req, res) => {
  if (req.url === "/upload") {
    let data = Buffer.alloc(0);
    const separator = "--" + req.headers["content-type"].split("boundary=")[1];
    console.log({ separator });
    req.on("data", (d) => {
      data = Buffer.concat([data, d]);
    });
    req.on("end", () => {
      parseFile(data, separator);
      res.end("upload");
    });
    return;
  }

  const file = fs.readFileSync(path.resolve(__dirname, "./index.html"));
  res.end(file);
});

app.listen(8084, () => {
  console.log("listen 8084");
});

function parseFile(content, separator) {
  const arrBuff = split(content, separator).slice(1, -1);
  arrBuff.forEach((item) => {
    // formdata数据中 head和body分割是两对 \r\n
    const headIndex = item.indexOf("\r\n\r\n");
    const head = item.slice(0, headIndex);
    const body = item.slice(headIndex + 4);

    const headArr = split(head, "\r\n").slice(1);
    const curHead = parseHead(headArr[0].toString());
    if (curHead.filename) {
      // 写入文件到磁盘
      fs.writeFile(
        path.resolve(__dirname, `./upload/${curHead.filename}`),
        body.slice(0, -2),
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );
    }
  });
}

function parseHead(header) {
  const value = header.split("; ");
  const valueObj = {};
  value.forEach((item) => {
    const [key, val = ""] = item.split(/=|:\s/);
    valueObj[key] = val.replace(/"/g, "");
  });
  console.log(valueObj);
  return valueObj;
}

function split(buffer, separator) {
  const res = [];
  let offset = 0;
  let index = buffer.indexOf(separator);
  while (index != -1) {
    res.push(buffer.slice(offset, index));
    offset = index + separator.length;
    index = buffer.indexOf(separator, offset);
  }
  res.push(buffer.slice(offset));
  return res;
}
