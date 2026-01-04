import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.ViTE_API_BASE_URL,
    withCredentials : true,
});

export default api;