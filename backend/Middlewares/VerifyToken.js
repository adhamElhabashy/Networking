const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (request, response, next) => {
	let token = request.headers.authorization?.split(" ")[1];

	if (!token) {
		return response.status(401).json({ message: "No Token Provided" });
	}

	try {
		let jwtVerification = jwt.verify(token, process.env.PRIVATEKEY);
		request.user = jwtVerification;
		next();
	} catch (error) {
		console.error("Token verification error:", error); // Log the error
		return response.status(401).json({ message: "Invalid Token" });
	}
});

module.exports = { verifyToken };
