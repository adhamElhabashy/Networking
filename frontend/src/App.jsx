import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { responsiveFontSizes, Typography } from "@mui/material";
import AppBar from "./Components/AppBar/AppBar";
import Landing from "./Sections/Landing/Landing";

let theme = createTheme({
	palette: { primary: { main: "#0099FF" }, secondary: { main: "#fff" } },
});

theme = responsiveFontSizes(theme);

function App() {
	return (
		<ThemeProvider theme={theme}>
			<AppBar />
			<Landing />
		</ThemeProvider>
	);
}

export default App;
