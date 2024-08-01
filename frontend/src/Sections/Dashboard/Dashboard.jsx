import * as React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import "./Dashboard.css";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
	textAlign: "center",
	height: 60,
	lineHeight: "60px",
}));

export default function Dashboard() {
	const profile = JSON.parse(window.localStorage.getItem("profile"));

	return (
		<Box className="dashboard-page" sx={{ backgroundColor: "primary.main" }}>
			<Container>
				<Box
					className="account-info"
					sx={{
						flexDirection: { xs: "column", md: "row" },
						textAlign: { xs: "center", md: "left" },
					}}
				>
					<div className="image-holder">
						<img src={profile?.user?.profilePhoto} alt="profile photo" />
					</div>
					<div className="user-info">
						<Typography variant="h5" color={"secondary"} className="user-info">
							{profile?.user?.username}
						</Typography>
						<Typography
							variant="subtitle1"
							color={"secondary"}
							className="user-info"
						>
							{profile?.user?.bio}
						</Typography>
					</div>
				</Box>
				<Grid container spacing={2} className="app-resources">
					<Grid item xs={12}>
						<Item elevation={24}>
							<Button className="resource-btn">Users</Button>
						</Item>
					</Grid>
					<Grid item xs={6}>
						<Item elevation={24}>
							<Button className="resource-btn" component={Link} to="posts">
								Posts
							</Button>
						</Item>
					</Grid>
					<Grid item xs={6}>
						<Item elevation={24}>
							<Button className="resource-btn">Comments</Button>
						</Item>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
