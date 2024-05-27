const express = require("express");
const sanitize = require("express-mongo-sanitize");
const AuthRouter = require("./Routes/AuthRoute");
const app = express();

app.use(express.json());
app.use(sanitize());

app.use("/api/v1/auth", AuthRouter);

module.exports = app;
