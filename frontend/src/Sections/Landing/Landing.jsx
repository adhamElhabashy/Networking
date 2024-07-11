import * as React from "react";
import WaveAnimation from "../../Components/WaveAnimation/WaveAnimation";
import { Box, Grid, Typography } from "@mui/material";
import Collaboration from "../../assets/Collaboration.png";
import "./Landing.css";

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
		</Box>
	);
}
