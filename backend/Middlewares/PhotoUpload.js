const path = require("path");
const multer = require("multer");

// photo storage
const photoStorage = multer.diskStorage({
	destination: (request, file, cb) => {
		cb(null, path.join(__dirname, "../images"));
	},
	filename: (request, file, cb) => {
		if (file) {
			cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
		} else {
			cb(null, false);
		}
	},
});

// photo upload middleware
const photoUpload = multer({
	storage: photoStorage,
	fileFilter: (request, file, cb) => {
		if (file.mimetype.startsWith("image")) {
			cb(null, true);
		} else {
			cb({ message: "Unsuported file format" }, false);
		}
	},
	limits: { fileSize: 1024 * 1024 }, // 1 megabyte
});

module.exports = photoUpload;
