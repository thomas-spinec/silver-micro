const express = require("express");
const app = express();
app.use(express.json());
const { port } = require("./config");
const PORT = port;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/status", (req, res) => {
  const status = {
    status: "running",
  };
  res.send(status);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
