const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
