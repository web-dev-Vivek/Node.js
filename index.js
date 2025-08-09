const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: New Req recived\n`;
  fs.appendFile("log.txt", log, (err, data) => {
    res.end("Hello, World!\n");
  });
});

myServer.listen(8000, () => console.log("Server is running on port 3000"));
