import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import CreateComment from "../../Api/CommentsApi/CreateComment";
import upadteComment from "../../Api/CommentsApi/UpdateComment";

export default function AddComment({ postId, commentValue, update }) {
	const [text, setText] = React.useState("Add Comment");

	React.useEffect(() => {
		if (update) {
			setText(commentValue.text);
		} else {
			setText("Add Comment");
		}
	}, [commentValue]);

	async function callCreateComment() {
		const response = await CreateComment(text, postId);
	}
	async function callUpdateComment() {
		const response = await upadteComment(text, commentValue._id);
	}

	function handleSubmit(e) {
		if (!update) {
			callCreateComment();
		} else {
			callUpdateComment();
		}
	}

	return (
		<Box
			component={"form"}
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit();
			}}
		>
			<TextField
				id="outlined-controlled"
				label="Comment"
				fullWidth
				value={text}
				onChange={(event) => {
					setText(event.target.value);
				}}
			/>
		</Box>
	);
}
