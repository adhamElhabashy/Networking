import * as React from "react";
import { Alert, Box, TextField } from "@mui/material";
import JoinImage from "../../assets/Join.png";
import "./SignIn.css";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import signIn from "../../Api/AuthApi/SignIn.js";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
	const formRef = React.useRef();
	const [emailValue, setEmailValue] = React.useState("");
	const [passwordValue, setPasswordValue] = React.useState("");
	const [error, setError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState("");
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();
		const form = formRef.current;
		if (form.checkValidity()) {
			try {
				await signIn(emailValue, passwordValue);
				setError(false);
				// this is a temporary navigate the will be changed with the feed route
				navigate("/");
			} catch ({ status, message }) {
				setError(true);
				setErrorMessage(message);
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
					id="email"
					label="email"
					type="email"
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
					type="password"
					sx={{ backgroundColor: "secondary.main" }}
					className="input"
					fullWidth
					value={passwordValue}
					onChange={(e) => {
						setPasswordValue(e.target.value);
					}}
				/>
				<ButtonComp type="submit">Sign In</ButtonComp>
				{error ? <Alert severity="error">{errorMessage}</Alert> : null}
			</Box>
		</Box>
	);
}
