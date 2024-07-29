import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Box, IconButton, ListItemAvatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddComment from "../AddComment/AddComment";
import Edit from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CommentsDrawer.css";
import DeleteComment from "../../Api/CommentsApi/DeleteComment";

export default function CommentsDrawer({
	open,
	toggleDrawer,
	comments,
	postId,
}) {
	const user = JSON.parse(window.localStorage.getItem("profile")).user;
	const [commentValue, setCommentValue] = React.useState("");
	const [update, setUpdate] = React.useState(false);

	async function callDeleteComment(id) {
		const response = await DeleteComment(id);
	}

	const DrawerList = (
		<Box sx={{ width: 300 }} role="presentation">
			<IconButton onClick={toggleDrawer(false)}>
				<CloseIcon />
			</IconButton>

			<AddComment postId={postId} commentValue={commentValue} update={update} />
			<List>
				{comments?.map((comment) => (
					<React.Fragment key={comment._id}>
						{user._id === comment.user._id ? (
							<>
								<ListItem key={comment._id}>
									<ListItemAvatar>
										<Avatar>
											<img
												src={comment.user.profilePhoto}
												alt={`${comment.username} Photo`}
											/>
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={comment.username}
										secondary={comment.text}
									/>
									{commentValue._id == comment._id ? (
										<IconButton
											onClick={() => {
												setCommentValue("");
												setUpdate(false);
											}}
										>
											{/* make this icon to be close */}
											<CloseIcon fontSize="small" />
										</IconButton>
									) : (
										<IconButton
											onClick={() => {
												setCommentValue(comment);
												setUpdate(true);
											}}
										>
											<Edit />
										</IconButton>
									)}
									<IconButton
										onClick={() => {
											callDeleteComment(comment._id);
										}}
									>
										<DeleteIcon />
									</IconButton>
								</ListItem>
							</>
						) : (
							<ListItem key={comment._id}>
								<ListItemAvatar>
									<Avatar>
										<img
											src={comment.user.profilePhoto}
											alt={`${comment.username} Photo`}
										/>
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={comment.username}
									secondary={comment.text}
								/>
							</ListItem>
						)}
					</React.Fragment>
				))}
			</List>
		</Box>
	);
	return (
		<Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
			{DrawerList}
		</Drawer>
	);
}
