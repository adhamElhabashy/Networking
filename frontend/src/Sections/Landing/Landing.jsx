import * as React from "react";
import WaveAnimation from "../../Components/WaveAnimation/WaveAnimation";
import { Box, Grid, Typography } from "@mui/material";
import Collaboration from "../../assets/Collaboration.png";
import TextField from "@mui/material/TextField";
import "./Landing.css";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";

export default function Landing() {
	return (
		<Box>
			<WaveAnimation />
			<Typography
				sx={{
					color: "secondary.main",
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
				variant="h4"
			>
				Network, Collaborate, And Have Fun
			</Typography>
			<Grid container sx={{ height: "100vh" }}>
				<Grid item xs={12} lg={6} sx={{ position: "relative" }}>
					<div className="text-box">
						<Typography
							sx={{
								color: "primary.main",
								flexGrow: 1,
							}}
							variant="h4"
						>
							Share your knowledge and get the knowledge from others
						</Typography>
					</div>
				</Grid>
				<Grid item xs={12} lg={6}>
					<div className="img-holder">
						<img src={Collaboration} alt="Collaboration Image" />
					</div>
				</Grid>
			</Grid>
			<Box
				sx={{
					height: "100vh",
					position: "relative",
					background: "linear-gradient(90deg, #0099ff 0%, #33ccff 100%)",
				}}
			>
				<div
					style={{
						position: "absolute",
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<Typography
						variant="h4"
						textAlign={"center"}
						color={"secondary"}
						sx={{ width: "100%" }}
					>
						Start To Inspire People And Get Inspired By Them
					</Typography>
					<div
						className="sign"
						style={{
							marginTop: "20px",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<TextField
							id="email"
							label="Email"
							variant="outlined"
							fullWidth
							sx={{
								zIndex: 1,
								backgroundColor: "secondary.main",
							}}
						/>
						<ButtonComp sx={{ marginTop: "10px" }}>Let's Go</ButtonComp>
					</div>
				</div>
			</Box>
		</Box>
	);
}
