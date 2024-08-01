import * as React from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import DeleteComment from "../../Api/CommentsApi/DeleteComment";

const Item = styled(Paper)(({ theme }) => ({
	lineHeight: "60px",
	padding: "10px 20px",
}));

export default function CommentPaper({ comment }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	async function callDeleteComment(id) {
		const response = await DeleteComment(id);
	}

	const handleClick = (event) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (e) => {
		callDeleteComment(e.target.id);
	};

	return (
		<>
			<Box className="comments-menu-container">
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
					<MenuItem onClick={handleMenuItemClick} id={comment._id}>
						Delete
					</MenuItem>
				</Menu>
			</Box>
			<Item elevation={24}>
				<Typography variant="h6" sx={{ margin: 0 }}>
					{comment.username}
				</Typography>
				<Typography variant="string">{comment.text}</Typography>
			</Item>
		</>
	);
}
