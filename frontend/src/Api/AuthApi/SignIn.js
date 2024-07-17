import axios from "axios";
import saveInLocalStorage from "../../Functions/SaveInLocalStorage";

export default async function SignIn(email, password) {
	const postData = {
		email,
		password,
	};

	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/api/v1/auth/signin`,
			postData,
			{ withCredentials: true }
		);
		const { data } = response.data;

		saveInLocalStorage(data);
	} catch (error) {
		const status = error.response ? error.response.status : null;
		const message =
			error.response && error.response.data
				? error.response.data.message
				: error.message;
		throw { status, message };
	}
}
