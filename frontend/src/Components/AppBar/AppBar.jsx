import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ButtonComp from "../ButtonComp/ButtonComp";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import "./AppBar.css";
import useLocalStorage from "../../Hooks/useLocalStorage";
import SignOut from "../../Api/AuthApi/SignOut";

const settings = ["Account", "Saved", "Settings", "Logout"];

export default function AppBarComp() {
	const [storageValue, setStorageValue] = useLocalStorage("profile");
	const [isUser, setIsUser] = React.useState(false);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();

	async function callSignOut() {
		const response = await SignOut();
		navigate("/");
	}

	React.useEffect(() => {
		if (storageValue) {
			console.log(JSON.parse(storageValue).user.isAdmin);
			setIsUser(true);
		} else {
			setIsUser(false);
		}
	}, [storageValue]);

	function handleClick(e) {
		if (e.currentTarget.id === "Logout") {
			e.preventDefault();
			callSignOut();
		}
	}

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ flexGrow: 1, marginBottom: 0 }}>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to={"/"} className="link">
							Networking
						</Link>
					</Typography>
					{!isUser ? (
						<>
							{" "}
							<ButtonComp
								variant="contained"
								size="large"
								sx={{
									marginRight: "20px",
									display: { xs: "none", sm: "block" },
								}}
							>
								<Link to="/signin" className="link">
									Sign In
								</Link>
							</ButtonComp>
							<ButtonComp
								variant="contained"
								size="large"
								sx={{
									marginRight: "20px",
									display: { xs: "none", sm: "block" },
								}}
							>
								<Link to={"/signUp"} className="link">
									Sign Up
								</Link>
							</ButtonComp>
						</>
					) : (
						<Box sx={{ flexGrow: 0, marginRight: "15px" }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src={storageValue?.profilePhoto} />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: "45px" }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										key={setting}
										component={Link}
										to={`/${setting}`}
										onClick={(e) => {
											handleCloseUserMenu();
											handleClick(e);
										}}
										id={setting}
									>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
								{JSON.parse(storageValue)?.user.isAdmin && (
									<MenuItem
										component={Link}
										to={`/dashboard`}
										onClick={(e) => {
											handleCloseUserMenu();
											handleClick(e);
										}}
										id={"dashboard"}
									>
										<Typography textAlign="center">Dashboard</Typography>
									</MenuItem>
								)}
							</Menu>
						</Box>
					)}
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon fontSize="large" />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
