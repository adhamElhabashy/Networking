import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UpdateUserProfile from "../../Api/UsersApi/UpdateUserProfile";
import saveInLocalStorage from "../../Functions/SaveInLocalStorage";

export default function UpdateUserForm() {
	const [open, setOpen] = React.useState(false);
	const profile = JSON.parse(window.localStorage.getItem("profile"));
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	async function callUpdateUserProfile(id, email, username, bio) {
		const response = await UpdateUserProfile(id, email, username, bio);

		saveInLocalStorage(response.data);
	}

	return (
		<>
			<Button variant="outlined" onClick={handleClickOpen} color="secondary">
				Update Your Profile
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth
				PaperProps={{
					component: "form",
					onSubmit: (event) => {
						event.preventDefault();
						const formData = new FormData(event.currentTarget);
						const formJson = Object.fromEntries(formData.entries());
						const email = formJson.email || profile.user.email;
						const username = formJson.username || profile.user.username;
						const bio = formJson.bio || profile.user.bio;
						callUpdateUserProfile(profile.user._id, email, username, bio);
						handleClose();
					},
				}}
			>
				<DialogTitle>Update...</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="email"
						name="email"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
						placeholder={profile.user.email}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="username"
						name="username"
						label="Username"
						type="text"
						fullWidth
						variant="standard"
						placeholder={profile.user.username}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="bio"
						name="bio"
						label="Bio"
						type="text"
						fullWidth
						variant="standard"
						placeholder={profile.user.bio}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Update</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
