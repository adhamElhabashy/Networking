import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import CreateComment from "../../Api/CommentsApi/CreateComment";

export default function AddComment({ postId }) {
	const [text, setText] = React.useState("Add Comment");

	async function callCreateComment() {
		const response = await CreateComment(text, postId);
	}

	function handleSubmit(e) {
		callCreateComment();
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
