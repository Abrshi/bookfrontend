import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,  // Reads from the .env file
});

export default axiosInstance;
