import * as React from "react";
import { Box, Container, Grid } from "@mui/material";
import "./DashboardOfComments.css";
import GetAllComments from "../../Api/CommentsApi/GetAllComments";
import CommentPaper from "../../Components/CommentPaper/CommentPaper";

export default function DashboardOfComments() {
	const [comments, setComments] = React.useState([]);

	async function callGetAllComments() {
		const response = await GetAllComments();
		setComments(response.comments);
	}

	React.useEffect(() => {
		callGetAllComments();

		// this feature will be replaced with another technology
	}, [callGetAllComments]);

	return (
		<Box
			className="dashboard-comments-box"
			sx={{ backgroundColor: "primary.main" }}
		>
			<Container>
				<Grid container spacing={2} className="comments-grid">
					{comments.map((comment) => (
						<Grid item xs={12} key={comment._id} className="comment">
							<CommentPaper comment={comment} />
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
}
