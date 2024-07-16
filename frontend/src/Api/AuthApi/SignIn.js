import axios from "axios";
import saveInLocalStorage from "../../Functions/SaveInLocalStorage";

const postData = {
	email: "adham@newadmin.com",
	password: "test12345",
};

export default async function SignIn(email, password) {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_URL}/api/v1/auth/signin`,
			postData,
			{ withCredentials: true }
		);
		const { data } = response.data;

		saveInLocalStorage(data);
		console.log(data);
	} catch (error) {}
}
