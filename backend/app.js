const express = require("express");
const sanitize = require("express-mongo-sanitize");
const app = express();

app.use(express.json());
app.use(sanitize);

module.exports = app;
