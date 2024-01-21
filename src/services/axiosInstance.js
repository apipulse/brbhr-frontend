import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8085/api/', // Update with your actual API URL
    // You can add more default settings here
});

export default axiosInstance;
