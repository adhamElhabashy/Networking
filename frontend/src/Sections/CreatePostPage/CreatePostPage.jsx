import * as React from "react";
import { Box } from "@mui/material";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import "./CreatePostPage.css";
import CreatePost from "../../Api/PostsAPi/CreatePost";
import { useNavigate } from "react-router-dom";

export default function CreatePostPage() {
	const titleRef = React.useRef();
	const categoryRef = React.useRef();
	const descriptionRef = React.useRef();

	const [title, setTitle] = React.useState("What Do You Think");
	const [category, setCategory] = React.useState("Category");
	const [description, setDescription] = React.useState("Write Your Post Here");

	const [data, setData] = React.useState({});

	const navigate = useNavigate();

	async function callCreatePost() {
		try {
			const postsData = await CreatePost(title, description, category);
			setData(postsData.post);
			navigate(`/posts/${postsData.post._id}`);
		} catch (error) {
			if (error.status === 401) {
				window.localStorage.clear();
				navigate("/signin");
			}
		}
	}

	function handleSubmit(event) {
		event.preventDefault();
		callCreatePost(event);
	}

	return (
		<Box className="create-post-box" sx={{ backgroundColor: "primary.main" }}>
			<div className="img-holder">
				<img src="https://placeholder.com/400" alt="post image" />
			</div>
			<form className="post-content-input" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="What Do You Think"
					className="post-title"
					required
					ref={titleRef}
					value={title}
					onChange={(e) => {
						setTitle(e.currentTarget.value);
					}}
				/>
				<input
					type="text"
					placeholder="Category"
					required
					ref={categoryRef}
					value={category}
					onChange={(e) => {
						setCategory(e.currentTarget.value);
					}}
				/>
				<textarea
					placeholder="Write Your Post Here"
					required
					ref={descriptionRef}
					value={description}
					onChange={(e) => {
						setDescription(e.currentTarget.value);
					}}
				/>
				<ButtonComp type="submit">Publish Post</ButtonComp>
			</form>
		</Box>
	);
}
