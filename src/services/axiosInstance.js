import axios from 'axios';

const axiosInstance = axios.create({
<<<<<<< HEAD
    baseURL: 'http://ec2-3-109-211-75.ap-south-1.compute.amazonaws.com:8085/api/'
=======
    baseURL: 'http://localhost:8085/api/', // Update with your actual API URL
>>>>>>> upstream/main
    // You can add more default settings here
});

export default axiosInstance;
