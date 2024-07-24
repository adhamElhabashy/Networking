import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Box, IconButton, ListItemAvatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddComment from "../AddComment/AddComment";

export default function CommentsDrawer({
	open,
	toggleDrawer,
	comments,
	postId,
}) {
	const DrawerList = (
		<Box sx={{ width: 300 }} role="presentation">
			<IconButton onClick={toggleDrawer(false)}>
				<CloseIcon />
			</IconButton>

			<AddComment postId={postId} />
			<List>
				{comments?.map((comment) => (
					<ListItem key={comment._id}>
						<ListItemAvatar>
							<Avatar>
								<img
									src={comment.user.profilePhoto}
									alt={`${comment.username} Photo`}
								/>
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={comment.username} secondary={comment.text} />
					</ListItem>
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
