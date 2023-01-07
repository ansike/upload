const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((req, res) => {
  if (req.url === "/upload") {
    const writeStream = fs.createWriteStream(
      path.resolve(__dirname, "../upload/file.jpeg")
    );
    req.pipe(writeStream);
    res.end("upload");
    return;
  }

  const file = fs.readFileSync(path.resolve(__dirname, "./index.html"));
  res.end(file);
});

app.listen(8085, () => {
  console.log("listen 8085");
});
