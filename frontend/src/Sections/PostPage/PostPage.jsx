import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import GetSinglePost from "../../Api/PostsAPi/GetSinglePost";
import { Box, Container, IconButton, Typography } from "@mui/material";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./PostPage.css";
import CommentsDrawer from "../../Components/CommentsDrawer/CommentsDrawer";
import ToggleLike from "../../Api/PostsAPi/ToggleLike";

export default function PostPage() {
	const { id } = useParams();
	const [post, setPost] = React.useState({});
	const navigate = useNavigate();

	const [open, setOpen] = React.useState(false);

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};
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

	async function callToggleLike() {
		const data = await ToggleLike(id);
		console.log(data);
	}

	React.useEffect(() => {
		callGetSinglePost();
		// this code will be replaced with some technology
	}, [callGetSinglePost()]);

	return (
		<Box className="post-page-box" sx={{ backgroundColor: "primary.main" }}>
			<Container>
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
					<Typography
						component={Link}
						to={`/profiles/${post.user?._id}`}
						variant="subtitle1"
						color={"secondary"}
					>
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
			</Container>
			<div className="actions">
				<IconButton color="inherit" onClick={toggleDrawer(true)}>
					<InsertCommentIcon />
					<Typography variant="caption">{post.comments?.length}</Typography>
				</IconButton>
				<IconButton color="inherit" onClick={callToggleLike}>
					<FavoriteIcon />
					<Typography variant="caption">{post.likes?.length}</Typography>
				</IconButton>
			</div>
			<CommentsDrawer
				open={open}
				toggleDrawer={toggleDrawer}
				comments={post.comments}
				postId={post._id}
			/>
		</Box>
	);
}
