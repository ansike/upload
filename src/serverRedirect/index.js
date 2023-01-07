const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((req, res) => {
  if (req.url === "/upload") {
    const newReq = http.request("http://localhost:9000/upload", {
      headers: req.headers,
    }, newRes=>{
      newRes.pipe(res);
    });
    req.pipe(newReq)
    return;
  }

  const file = fs.readFileSync(path.resolve(__dirname, "./index.html"));
  res.end(file);
});

app.listen(8086, () => {
  console.log("listen 8086");
});
