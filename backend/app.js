const express = require("express");
const sanitize = require("express-mongo-sanitize");
const AuthRouter = require("./Routes/AuthRoute");
const UsersRouter = require("./Routes/UsersRoute");
const PostsRouter = require("./Routes/PostsRoute");
const app = express();

app.use(express.json());
app.use(sanitize());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UsersRouter);
app.use("/api/v1/posts", PostsRouter);

module.exports = app;
