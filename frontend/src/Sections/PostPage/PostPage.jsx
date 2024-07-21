import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import GetSinglePost from "../../Api/PostsAPi/GetSinglePost";
import { Box, IconButton, Typography } from "@mui/material";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./PostPage.css";

export default function PostPage() {
	const { id } = useParams();
	const [post, setPost] = React.useState({});
	const navigate = useNavigate();

	React.useEffect(() => {
		async function callGetSinglePost() {
			try {
				const data = await GetSinglePost(id);
				setPost(data.post);
			} catch (error) {
				if (error.status === 401) {
					window.localStorage.clear();
					navigate("/signin");
				}
			}
		}
		callGetSinglePost();
	}, []);

	return (
		<Box className="post-page-box">
			<div className="img-holder">
				<img src="https://placeholder.com/400" alt="post image" />
			</div>
			<div className="user-info">
				<div className="user-image">
					<img
						src={post.user?.profilePhoto}
						alt={`${post.user?.username} photo`}
					/>
				</div>
				<Typography variant="subtitle1" color={"secondary"}>
					{post.user?.username}
				</Typography>
			</div>
			<div className="post-content">
				<Typography
					variant="h5"
					color={"secondary"}
					textAlign={"center"}
					gutterBottom
				>
					{post.title}
				</Typography>
				<Typography color={"secondary"} variant="body">
					{post.description}
				</Typography>
			</div>
			<div className="actions">
				<IconButton color="inherit">
					<InsertCommentIcon />
				</IconButton>
				<IconButton color="inherit">
					<FavoriteIcon />
				</IconButton>
			</div>
		</Box>
	);
}
