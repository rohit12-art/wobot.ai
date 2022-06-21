const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const upload = require("express-fileupload");
const path = require("path");
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(upload());
app.use(express.json());

const connection = require("./db/conn");
const { on } = require("events");

app.use(require("./router/router"));

app.get((req, res) => {
  res.send(`Hello`);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
