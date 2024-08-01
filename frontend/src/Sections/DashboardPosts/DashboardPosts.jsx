import * as React from "react";
import { Box, Container, Grid } from "@mui/material";
import "./DashboardPosts.css";
import GetAllPosts from "../../Api/PostsAPi/GetAllPosts";
import Post from "../../Components/Post/Post";

export default function DashboardPosts() {
	const [posts, setPosts] = React.useState([]);

	async function callGetAllPosts() {
		const response = await GetAllPosts();
		setPosts(response.posts);
	}

	React.useEffect(() => {
		callGetAllPosts();
	}, []);

	return (
		<Box
			className="dashboard-posts-box"
			sx={{ backgroundColor: "primary.main" }}
		>
			<Container>
				<Grid container>
					{posts?.map((post) => (
						<Grid
							item
							xs={12}
							md={6}
							lg={4}
							key={post._id}
							className="dashboard-posts-item"
						>
							<Post post={post} />
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
}
