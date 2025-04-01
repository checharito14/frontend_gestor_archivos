import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_URL_DEL_BACKEND,
});

export default api