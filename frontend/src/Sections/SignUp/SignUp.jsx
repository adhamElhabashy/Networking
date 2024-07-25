import * as React from "react";
import { Alert, Box, TextField } from "@mui/material";
import JoinImage from "../../assets/Join.png";
import "./SignUp.css";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import { useNavigate } from "react-router-dom";
import signUp from "../../Api/AuthApi/SignUp";

export default function SignUp() {
	const formRef = React.useRef();
	const [usernameValue, setUsernameValue] = React.useState("");
	const [emailValue, setEmailValue] = React.useState("");
	const [passwordValue, setPasswordValue] = React.useState("");
	const [confirmPasswordValue, setConfirmPasswordValue] = React.useState("");
	const [error, setError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		const form = formRef.current;
		if (form.checkValidity()) {
			if (passwordValue.length < 8) {
				setError(true);
				setErrorMessage("Password Should Be Greater Than 8");
			} else if (passwordValue !== confirmPasswordValue) {
				setError(true);
				setErrorMessage("Password and confirm password doesn't match");
			} else {
				try {
					const response = await signUp({
						username: usernameValue,
						email: emailValue,
						password: passwordValue,
						confirmPassword: confirmPasswordValue,
					});
					navigate("/signin");
					setError(false);
					// this is a temporary navigate the will be changed with the feed route
				} catch ({ status, message }) {
					setError(true);
					setErrorMessage(message);
				}
			}
		} else {
			setError(true);
			setErrorMessage("Please fill out all required fields correctly.");
		}
	}

	return (
		<Box sx={{ height: "100vh", position: "relative" }}>
			<img
				src={JoinImage}
				alt="join"
				style={{ height: "100%", width: "100%" }}
			/>
			<div
				className="overlay"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					height: "100%",
					width: "100%",
					backgroundColor: "rgb(0 153 255 / 60%",
				}}
			></div>
			<Box
				component="form"
				ref={formRef}
				onSubmit={handleSubmit}
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					display: "flex",
					flexDirection: "column",
					width: "60%",
					padding: "20px",
				}}
			>
				<TextField
					required
					id="username"
					label="username"
					sx={{ backgroundColor: "secondary.main" }}
					className="input"
					fullWidth
					value={usernameValue}
					onChange={(e) => {
						setUsernameValue(e.target.value);
					}}
				/>
				<TextField
					required
					id="email"
					label="email"
					sx={{ backgroundColor: "secondary.main" }}
					className="input"
					fullWidth
					value={emailValue}
					onChange={(e) => {
						setEmailValue(e.target.value);
					}}
				/>
				<TextField
					required
					id="password"
					label="password"
					sx={{ backgroundColor: "secondary.main" }}
					className="input"
					fullWidth
					value={passwordValue}
					onChange={(e) => {
						setPasswordValue(e.target.value);
					}}
				/>
				<TextField
					required
					id="confirmPassword"
					label="confirmPassword"
					sx={{ backgroundColor: "secondary.main" }}
					className="input"
					fullWidth
					value={confirmPasswordValue}
					onChange={(e) => {
						setConfirmPasswordValue(e.target.value);
					}}
				/>
				<ButtonComp type="submit">Sign Up</ButtonComp>
				{error ? <Alert severity="error">{errorMessage}</Alert> : null}
			</Box>
		</Box>
	);
}
