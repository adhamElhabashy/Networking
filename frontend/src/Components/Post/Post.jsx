import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Post({ post, className }) {
	return (
		<Card
			sx={{ width: 345, marginTop: "10px" }}
			key={post._id}
			className={className}
		>
			<CardActionArea href={`/posts/${post._id}`}>
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
						{post?.description?.slice(0, 100)}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
