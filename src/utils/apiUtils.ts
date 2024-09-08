import axios from "axios";

type Config = {
    headers: any
}

const api = axios.create({
    baseURL: "https://movieapi.cyberlearn.vn/api/",
})

api.interceptors.request.use((config: Config) => {
    
    const token = localStorage.getItem('authToken');

    config.headers = {
        ...config.headers,
        Authorization: token ? `Bearer ${token}` : null,
    }

    return config
})

export default api