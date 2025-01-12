const fs = require("fs/promises");
const http = require("http");

// 1

const checkForDictionary = async (fileName) => {
  const dirs = await fs.readdir(__dirname);
  for (let key of dirs) {
    if (key == fileName) {
      console.log("Found");
    }
  }
};

// checkForDictionary("main.js");

// 2

// Create a simple HTTP GET server that reads user data from data.json
// and returns it to the client. Ensure that data.json is present before
// reading the data.

// 3 Add a new route that returns a random number between 1 and 100 at /random.

const server = http.createServer(async (req, res) => {
  const url = req.url;

  if (url === "/") {
    const dirs = await fs.readdir(__dirname);
    if (dirs.includes("data.json")) {
      const data = await fs.readFile("data.json", "utf-8");
      res.setHeader("Content-Type", "application/json");
      res.end(data);
      return;
    }
    res.end();
  }

  if (url === "/random") {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    res.setHeader("Content-Type", "text/plain");
    res.write(randomNumber.toString());
    res.end();
    return;
  }

  if (url === "/html") {
    res.setHeader("Content-Type", "text/html");
    const simpleHTML = `<h1>Hello Wodlr!</h1>`;
    res.write(simpleHTML);
    res.end();
    return;
  }

  if (url === "/current-time") {
    const currentTime = new Date().toISOString();
    res.setHeader("Content-Type", "text/plain");
    res.write("Curent Time - " + currentTime);
    res.end();
    return;
  }

  if (url === "/api") {
    const api = await fs.readFile("api.json", "utf-8");
    res.setHeader("Content-Type", "application/json");
    res.write(api);
    res.end();
    return;
  }
});

server.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
