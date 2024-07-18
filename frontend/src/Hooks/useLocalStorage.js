import { useState, useEffect } from "react";

function useLocalStorage(key) {
	const [storedValue, setStoredValue] = useState(() => {
		return localStorage.getItem(key);
	});

	useEffect(() => {
		const handleStorageChange = () => {
			setStoredValue(localStorage.getItem(key));
		};

		window.addEventListener("storage", handleStorageChange);

		const observer = new MutationObserver(() => handleStorageChange());
		const config = { attributes: true, childList: true, subtree: true };

		observer.observe(document.body, config);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
			observer.disconnect();
		};
	}, [key]);

	const setValue = (value) => {
		localStorage.setItem(key, value);
		setStoredValue(value);
	};

	return [storedValue, setValue];
}

export default useLocalStorage;
