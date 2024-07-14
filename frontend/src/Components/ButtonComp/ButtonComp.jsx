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
export default function ButtonComp({ children, sx }) {
	return (
		<MyButton variant="contained" size="large" sx={sx}>
			{children}
		</MyButton>
	);
}
