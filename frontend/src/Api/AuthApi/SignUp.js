import axios from "axios";
import saveInLocalStorage from "../../Functions/SaveInLocalStorage";

export default async function signUp({
	username,
	email,
	password,
	confirmPassword,
}) {
	const postData = {
		username,
		email,
		password,
		confirmPassword,
	};

	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/api/v1/auth/signup`,
			postData,
			{ withCredentials: true }
		);
		const { data } = response.data;
	} catch (error) {
		const status = error.response ? error.response.status : null;
		const message =
			error.response && error.response.data
				? error.response.data.message
				: error.message;
		throw { status, message };
	}
}
