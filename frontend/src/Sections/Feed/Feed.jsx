import * as React from "react";
import "./Feed.css";
import { Box } from "@mui/material";
import GetAllPosts from "../../Api/PostsAPi/GetAllPosts";
import { useNavigate } from "react-router-dom";
import Post from "../../Components/Post/Post";

export default function Feed() {
	const [data, setData] = React.useState([]);
	const navigate = useNavigate();
	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const posts = await GetAllPosts();
				setData(posts);
			} catch (error) {
				if (error.status === 401) {
					window.localStorage.clear();
					navigate("/signin");
				}
			}
		};
		fetchData();
	}, []); // Empty dependency array means this runs once after the first render

	return (
		<Box className="feed-box">
			{data.posts?.map((post) => (
				<Post post={post} key={post._id} className={"feed-post"} />
			))}
		</Box>
	);
}
