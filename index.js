const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }

  const log = `${Date.now()}: ${req.url} - New request received\n`;
  const myUrl = url.parse(req.url, true); // fixed variable name
  console.log(myUrl);

  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
      res.statusCode = 500;
      return res.end("Internal Server Error");
    }

    switch (myUrl.pathname) {
      case "/":
        res.end("<h1>Welcome to the Home Page</h1>");
        break;

      case "/about":
        const username = myUrl.query.myname;
        res.end(`<h1>Welcome, ${username}, to the Bro Page</h1>`);
        break;

      default:
        res.statusCode = 404;
        res.end("<h1>404 Not Found</h1>");
        break;
    }
  });
});

myServer.listen(8000, () => console.log("Server is running on port 8000"));
