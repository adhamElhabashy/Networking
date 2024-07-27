import * as React from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import "./Account.css";
import { Link, useNavigate } from "react-router-dom";
import GetPostsOfUser from "../../Api/UsersApi/GetPostsOfUser";
import Post from "../../Components/Post/Post";
import UpdateUserForm from "../../Components/UpdateUserForm/UpdateUserForm";
import DeleteUser from "../../Api/UsersApi/DeleteUser";
import removeFromLocalStorage from "../../Functions/RemoveFromLocalStorage";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Account() {
	const profile = JSON.parse(window.localStorage.getItem("profile"));
	const navigate = useNavigate();
	const [posts, setPosts] = React.useState([]);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		if (!profile) {
			navigate("/signin");
		} else {
			const fetchData = async () => {
				try {
					const { posts } = await GetPostsOfUser(profile.user._id);
					setPosts(posts);
				} catch ({ status, message }) {
					if (status === 401) {
						window.localStorage.clear();
						navigate("/signin");
					}
				}
			};

			fetchData();
		}
		// this feature will be replaced with another technology
	}, [GetPostsOfUser(profile.user._id)]);

	async function callDeleteUser() {
		handleClose();
		const response = await DeleteUser(profile.user._id);
		removeFromLocalStorage();

		navigate("/");
	}

	return (
		<Box className="account-container" sx={{ backgroundColor: "primary.main" }}>
			<Container>
				<Box
					className="account-info"
					sx={{
						flexDirection: { xs: "column", md: "row" },
						textAlign: { xs: "center", md: "left" },
					}}
				>
					<div className="image-holder">
						<img src={profile?.user?.profilePhoto} alt="profile photo" />
					</div>
					<div className="user-info">
						<Typography variant="h5" color={"secondary"} className="user-info">
							{profile?.user?.username}
						</Typography>
						<Typography
							variant="subtitle1"
							color={"secondary"}
							className="user-info"
						>
							{profile?.user?.bio}
						</Typography>
						<UpdateUserForm />
						<Button
							variant="contained"
							color="error"
							className="delete-account-btn"
							onClick={handleClickOpen}
						>
							Delete Account
						</Button>
						<Dialog
							open={open}
							onClose={handleClose}
							aria-labelledby="alert-dialog-title"
							aria-describedby="alert-dialog-description"
						>
							<DialogTitle id="alert-dialog-title">
								Confirm Deleting Your Account
							</DialogTitle>
							<DialogContent>
								<DialogContentText id="alert-dialog-description">
									If you still want to delete your account click "Delete My
									Account"
								</DialogContentText>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Cancel</Button>
								<Button onClick={callDeleteUser} autoFocus>
									Delete My Account
								</Button>
							</DialogActions>
						</Dialog>
					</div>
				</Box>
				<div className="posts-box">
					<Grid container spacing={2}>
						{posts?.map((post) => (
							<Grid item xs={12} md={6} lg={4} key={post._id} className="post">
								<Post post={post} className="account-post" />
							</Grid>
						))}
					</Grid>
				</div>
				<Button variant="contained" fullWidth component={Link} to="posts/new">
					<CreateIcon />
					New Post
				</Button>
			</Container>
		</Box>
	);
}
