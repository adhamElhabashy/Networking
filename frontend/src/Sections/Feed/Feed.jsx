import * as React from "react";
import "./Feed.css";
import { Box } from "@mui/material";
import GetAllPosts from "../../Api/PostsAPi/GetAllPosts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
					navigate("/signin");
				}
			}
		};
		fetchData();
	}, []); // Empty dependency array means this runs once after the first render

	console.log(data.posts);
	return (
		<Box className="feed-box">
			{data.posts?.map((post) => (
				<Card sx={{ width: 345, marginTop: "10px" }} key={post._id}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="140"
							image="/static/images/cards/contemplative-reptile.jpg"
							alt="green iguana"
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{post.title}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{post.description.slice(0, 100)}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			))}
		</Box>
	);
}
