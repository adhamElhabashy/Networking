const express = require("express");
const sanitize = require("express-mongo-sanitize");
const AuthRouter = require("./Routes/AuthRoute");
const UsersRouter = require("./Routes/UsersRoute");
const app = express();

app.use(express.json());
app.use(sanitize());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/Users", UsersRouter);

module.exports = app;
