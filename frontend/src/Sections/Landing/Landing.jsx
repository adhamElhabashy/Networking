import * as React from "react";
import WaveAnimation from "../../Components/WaveAnimation/WaveAnimation";
import { Typography } from "@mui/material";

export default function Landing() {
	return (
		<>
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
		</>
	);
}
