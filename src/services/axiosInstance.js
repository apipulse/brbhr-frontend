import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.REACT_APP_API_BASE_URL, // Update with your actual API URL
    // You can add more default settings here
});

export default axiosInstance;
