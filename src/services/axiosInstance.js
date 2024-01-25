import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-3-109-211-75.ap-south-1.compute.amazonaws.com:8085/api/', // Update with your actual API URL
    // You can add more default settings here
});

export default axiosInstance;
