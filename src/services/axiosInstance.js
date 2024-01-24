import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BRB_HR_BASE_URL, // Update with your actual API URL
    // You can add more default settings here
});

export default axiosInstance;
