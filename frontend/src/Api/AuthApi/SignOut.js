import axios from "axios";
import removeFromLocalStorage from "../../Functions/RemoveFromLocalStorage";

export default async function SignOut() {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/api/v1/auth/signout`,
			{},
			{ withCredentials: true }
		);

		removeFromLocalStorage();
	} catch (error) {
		const status = error.response ? error.response.status : null;
		const message =
			error.response && error.response.data
				? error.response.data.message
				: error.message;
		throw { status, message };
	}
}
