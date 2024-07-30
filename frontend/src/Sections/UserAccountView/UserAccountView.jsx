import * as React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Post from "../../Components/Post/Post";
import GetUser from "../../Api/UsersApi/GetUser";
import { useParams } from "react-router-dom";
import GetPostsOfUser from "../../Api/UsersApi/GetPostsOfUser";

export default function UserAccountView() {
	const [profile, setProfile] = React.useState({});
	const [posts, setPosts] = React.useState([]);
	const { id } = useParams();

	async function callGetUser() {
		const response = await GetUser(id);
		setProfile(response.user);
	}

	React.useEffect(() => {
		callGetUser();
	}, []);

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const { posts } = await GetPostsOfUser(id);
				setPosts(posts);
			} catch ({ status, message }) {
				if (status === 401) {
					window.localStorage.clear();
					navigate("/signin");
				}
			}
		};

		fetchData();

		// this feature will be replaced with another technology
	}, [GetPostsOfUser(id)]);

	return (
		<Box className="account-container" sx={{ backgroundColor: "primary.main" }}>
			<Container>
				<Box
					className="account-info"
					sx={{
						flexDirection: { xs: "column", md: "row" },
						textAlign: { xs: "center", md: "left" },
					}}
				>
					<div className="image-holder">
						<img
							src={profile?.profilePhoto}
							alt={`${profile?.username} photo`}
						/>
					</div>
					<div className="user-info">
						<Typography variant="h5" color={"secondary"} className="user-info">
							{profile?.username}
						</Typography>
						<Typography
							variant="subtitle1"
							color={"secondary"}
							className="user-info"
						>
							{profile?.bio}
						</Typography>
					</div>
				</Box>
				<div className="posts-box">
					<Grid container spacing={2}>
						{posts?.map((post) => (
							<Grid item xs={12} md={6} lg={4} key={post._id} className="post">
								<Post post={post} className="account-post" />
							</Grid>
						))}
					</Grid>
				</div>
			</Container>
		</Box>
	);
}
