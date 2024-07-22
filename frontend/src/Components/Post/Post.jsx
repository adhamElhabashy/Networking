import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./Post.css";

const options = ["Update", "Delete"];

export default function Post({ post, className }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card
			sx={{ width: 345, marginTop: "10px" }}
			key={post._id}
			className={`${className} card`}
		>
			<CardActionArea href={`/posts/${post._id}`}>
				<Box className="menu-container">
					<IconButton
						aria-label="more"
						id="long-button"
						aria-controls={open ? "long-menu" : undefined}
						aria-expanded={open ? "true" : undefined}
						aria-haspopup="true"
						onClick={handleClick}
					>
						<MoreVertIcon />
					</IconButton>
					<Menu
						id="long-menu"
						MenuListProps={{
							"aria-labelledby": "long-button",
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						className="post-menu"
					>
						{options.map((option) => (
							<MenuItem key={option} onClick={handleClose}>
								{option}
							</MenuItem>
						))}
					</Menu>
				</Box>
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
