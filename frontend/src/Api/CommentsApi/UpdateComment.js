import axios from "axios";
export default async function UpdateComment(text, id) {
	try {
		const response = await axios.put(
			`${import.meta.env.VITE_API_URL}/api/v1/comments/${id}`,
			{
				text,
			},
			{
				withCredentials: true,
			}
		);
		const { data } = response;
		return data;
	} catch (error) {
		console.error("Error details:", error); // Log full error details
		if (error.response) {
			console.error("Response data:", error.response.data);
			console.error("Response status:", error.response.status);
			console.error("Response headers:", error.response.headers);
		} else if (error.request) {
			console.error("Request data:", error.request);
		} else {
			console.error("Error message:", error.message);
		}
		throw error;
	}
}
