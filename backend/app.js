const express = require("express");
const sanitize = require("express-mongo-sanitize");
const AuthRouter = require("./Routes/AuthRoute");
const UsersRouter = require("./Routes/UsersRoute");
const PostsRouter = require("./Routes/PostsRoute");
const CommentsRouter = require("./Routes/CommentsRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(sanitize());
app.use(cookieParser());

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UsersRouter);
app.use("/api/v1/posts", PostsRouter);
app.use("/api/v1/comments", CommentsRouter);

module.exports = app;
