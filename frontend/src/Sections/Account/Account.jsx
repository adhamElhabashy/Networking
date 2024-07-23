import * as React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import "./Account.css";
import { Link, useNavigate } from "react-router-dom";
import GetPostsOfUser from "../../Api/UsersApi/GetPostsOfUser";
import Post from "../../Components/Post/Post";

export default function Account() {
	const profile = JSON.parse(window.localStorage.getItem("profile"));
	const navigate = useNavigate();
	const [posts, setPosts] = React.useState([]);

	React.useEffect(() => {
		if (!profile) {
			navigate("/signin");
		} else {
			const fetchData = async () => {
				try {
					const { posts } = await GetPostsOfUser(profile.user._id);
					setPosts(posts);
				} catch ({ status, message }) {
					if (status === 401) {
						window.localStorage.clear();
						navigate("/signin");
					}
				}
			};

			fetchData();
		}
		// this feature will be replaced with another technology
	}, [GetPostsOfUser(profile.user._id)]);

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
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
							adipisci corporis id quae dignissimos nam pariatur, inventore odio
							labore incidunt, quos accusamus nesciunt perspiciatis dolorum
							cupiditate quod. At, praesentium nihil.
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
				<Button variant="contained" fullWidth component={Link} to="posts/new">
					<CreateIcon />
					New Post
				</Button>
			</Container>
		</Box>
	);
}
