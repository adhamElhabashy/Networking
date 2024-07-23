import * as React from "react";
import { Box } from "@mui/material";
import ButtonComp from "../../Components/ButtonComp/ButtonComp";
import "./CreatePostPage.css";
import CreatePost from "../../Api/PostsAPi/CreatePost";
import { useNavigate, useParams } from "react-router-dom";
import GetSinglePost from "../../Api/PostsAPi/GetSinglePost";
import UpdatePost from "../../Api/PostsAPi/UpdatePost";

export default function CreatePostPage() {
	const titleRef = React.useRef();
	const categoryRef = React.useRef();
	const descriptionRef = React.useRef();

	const [title, setTitle] = React.useState("What Do You Think");
	const [category, setCategory] = React.useState("Category");
	const [description, setDescription] = React.useState("Write Your Post Here");

	const { id } = useParams();

	async function callGetSinglePost() {
		try {
			const response = await GetSinglePost(id);
			setTitle(response.post.title);

			setDescription(response.post.description);

			setCategory(response.post.category);
		} catch (error) {
			if (error.status === 401) {
				window.localStorage.clear();
				navigate("/signin");
			}
		}
	}

	async function callUpdatePost() {
		try {
			const response = await UpdatePost(id, title, description, category);
			navigate(`/posts/${id}`);
		} catch (error) {
			if (error.status === 401) {
				window.localStorage.clear();
				navigate("/signin");
			}
		}
	}

	React.useEffect(() => {
		if (id) {
			callGetSinglePost();
		}
	}, []);

	const navigate = useNavigate();

	async function callCreatePost() {
		try {
			const postsData = await CreatePost(title, description, category);
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
		if (!id) {
			callCreatePost(event);
		} else {
			callUpdatePost(event);
		}
	}

	const handleChange = (e) => {
		setDescription(e.target.value);
	};

	React.useEffect(() => {
		const textarea = descriptionRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, [description]);

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
					onChange={handleChange}
				/>
				{!id ? (
					<ButtonComp type="submit">Publish Post</ButtonComp>
				) : (
					<ButtonComp type="submit">Update Post</ButtonComp>
				)}
			</form>
		</Box>
	);
}
