import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { responsiveFontSizes, Typography } from "@mui/material";
import AppBar from "./Components/AppBar/AppBar";
import Landing from "./Sections/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Sections/SignUp/SignUp";
import SignIn from "./Sections/SignIn/SignIn";
import Feed from "./Sections/Feed/Feed";
import Account from "./Sections/Account/Account";
import PostPage from "./Sections/PostPage/PostPage";
import CreatePostPage from "./Sections/CreatePostPage/CreatePostPage";
import UserAccountView from "./Sections/UserAccountView/UserAccountView";
import Dashboard from "./Sections/Dashboard/Dashboard";
import DashboardPosts from "./Sections/DashboardPosts/DashboardPosts";
import DashboardOfUsers from "./Sections/DashboardOfUsers/DashboardOfUsers";
import DashboardOfComments from "./Sections/DashboardOfComments/DashboardOfComments";

let theme = createTheme({
	palette: { primary: { main: "#0099FF" }, secondary: { main: "#fff" } },
});

theme = responsiveFontSizes(theme);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AppBar />
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/feed" element={<Feed />} />
				<Route path="/account" element={<Account />} />
				<Route path="/account/posts/new" element={<CreatePostPage />} />
				<Route path="/account/posts/edit/:id" element={<CreatePostPage />} />
				<Route path="/posts/:id" element={<PostPage />} />
				<Route path="/profiles/:id" element={<UserAccountView />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/dashboard/posts" element={<DashboardPosts />} />
				<Route path="/dashboard/users" element={<DashboardOfUsers />} />
				<Route path="/dashboard/comments" element={<DashboardOfComments />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
