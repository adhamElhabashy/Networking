import * as React from "react";
import { Box, Grid, Typography } from "@mui/material";
import "./Account.css";
import { useNavigate } from "react-router-dom";

export default function Account() {
	const profile = JSON.parse(window.localStorage.getItem("profile"));
	const navigate = useNavigate();
	React.useEffect(() => {
		if (!profile) {
			navigate("/signin");
		} else {
			console.log(profile);
		}
	}, []);
	return (
		<Box className="account-container">
			<div className="account-info">
				<Grid container>
					<Grid item>
						<div className="img-holder">
							<img src={profile.user.profilePhoto} alt="profile photo" />
						</div>
					</Grid>
					<Grid item>
						<Typography variant="h5">{profile.user.username}</Typography>
						<Typography variant="h6">{profile.user.bio}</Typography>
					</Grid>
				</Grid>
			</div>
		</Box>
	);
}
