const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifiyAdmin = asyncHandler(async (request, response, next) => {
	let token = request.headers.authorization.split(" ")[1];
	let jwtVerification = jwt.verify(token, process.env.PRIVATEKEY);
	if (jwtVerification.isAdmin !== true) {
		return response.status(401).json({ message: "Only Admin Is Allowed" });
	}
	next();
});

module.exports = { verifiyAdmin };
