import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ButtonComp from "../ButtonComp/ButtonComp";

export default function AppBarComp() {
	return (
		<Box sx={{ flexGrow: 1, marginBottom: 0 }}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Networking
					</Typography>
					<ButtonComp
						variant="contained"
						size="large"
						sx={{ marginRight: "20px", display: { xs: "none", sm: "block" } }}
					>
						Sign In
					</ButtonComp>
					<ButtonComp
						variant="contained"
						size="large"
						sx={{ marginRight: "20px", display: { xs: "none", sm: "block" } }}
					>
						Sign Up
					</ButtonComp>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon fontSize="large" />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
