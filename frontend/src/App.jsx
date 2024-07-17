import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { responsiveFontSizes, Typography } from "@mui/material";
import AppBar from "./Components/AppBar/AppBar";
import Landing from "./Sections/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Sections/SignUp/SignUp";
import SignIn from "./Sections/SignIn/SignIn";

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
			</Routes>
		</ThemeProvider>
	);
}

export default App;
