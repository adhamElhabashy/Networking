import axios from "axios";
export default async function GetUser(id) {
	try {
		const response = await axios.get(
			`${import.meta.env.VITE_API_URL}/api/v1/users/${id}`,
			{
				withCredentials: true,
			}
		);
		const { data } = response.data;
		return data;
	} catch (error) {
		const status = error.response ? error.response.status : null;
		const message =
			error.response && error.response.data
				? error.response.data.message
				: error.message;
		throw { status, message };
	}
}
