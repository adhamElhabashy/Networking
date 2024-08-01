const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	username: { type: String, required: [true, "please enter your username"] },
	email: {
		type: String,
		lowercase: true,
		required: [true, "Please enter your email"],
	},
	password: {
		type: String,
		minlength: 8,
		required: [true, "please enter your password"],
		select: false,
	},
	confirmPassword: {
		type: String,
		required: [true, "please enter your password"],
		validate: {
			// this validator will only work for save and create
			validator: function (val) {
				return val == this.password;
			},
			message: "Password and confirm password doesn't match",
		},
	},
	isAdmin: { type: Boolean, default: false },
	profilePhoto: { type: String, default: "https://placehold.co/400" },
	bio: { type: String, minlength: 10 },
	active: { type: Boolean, default: true },
	accountVerified: { type: Boolean, default: false },
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetTokenExpires: Date,
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);

	this.confirmPassword = undefined;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
