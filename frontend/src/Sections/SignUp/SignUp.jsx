import * as React from "react";
import { Box, TextField } from "@mui/material";
import JoinImage from "../../assets/Join.png";
import "./SignUp.css";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";

export default function SignUp() {
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
				/>
				<TextField
					required
					id="email"
					label="email"
					sx={{ backgroundColor: "secondary.main" }}
					className="input"
					fullWidth
				/>
				<TextField
					required
					id="password"
					label="password"
					sx={{ backgroundColor: "secondary.main" }}
					className="input"
					fullWidth
				/>
				<TextField
					required
					id="confirmPassword"
					label="confirmPassword"
					sx={{ backgroundColor: "secondary.main" }}
					className="input"
					fullWidth
				/>
				<ButtonComp type="submit">Sign Up</ButtonComp>
			</Box>
		</Box>
	);
}
