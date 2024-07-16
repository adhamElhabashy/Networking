export default function saveInLocalStorage(data) {
	window.localStorage.setItem("profile", JSON.stringify(data));
}
