const serverless = require("serverless-http");
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get(":endpoint([\\/\\w\\.-]*)", (req, res) => {
  let endpoint = process.env.API_BASE_URL + req.params.endpoint;
  let bearerToken = process.env.API_BEARER_TOKEN;
  console.log(endpoint);
  console.log(bearerToken);
  axios({
    method: "get",
    url: endpoint,
    headers: {
      Authorization: `Bearer ${bearerToken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "X-Custom-Header": "True",
    },
  })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

// app.listen(5000, () => {
//   console.log("Server started on port 5000");
// });

module.exports.handler = serverless(app);
