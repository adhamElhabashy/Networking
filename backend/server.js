const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

mongoose.connect(process.env.CONN_STR).then(() => {
	console.log("app connected to the db");
});

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
	console.log("server is running");
});

process.on("unhandledRejection", (err) => {
	console.log(err.name, err.message);
	console.log("Unhandled rejection occured! Shutting down...");

	server.close(() => {
		process.exit(1);
	});
});

console.log(x);
