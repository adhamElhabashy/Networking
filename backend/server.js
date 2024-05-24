const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 8000;

const server = app.listen(8000, () => {
	console.log("server is running");
});
