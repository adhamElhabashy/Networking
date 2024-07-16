import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const MyButton = styled(Button)(({ theme }) => ({
	background: theme.palette.secondary.main,
	color: theme.palette.primary.main,
	"&:hover": {
		background: theme.palette.primary.main,
		color: theme.palette.secondary.main,
	},
}));
export default function ButtonComp({ children, sx, type, onClick }) {
	return (
		<MyButton
			variant="contained"
			size="large"
			sx={sx}
			type={type}
			onClick={onClick}
		>
			{children}
		</MyButton>
	);
}
