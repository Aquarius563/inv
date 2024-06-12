import axios from 'axios';

// Set the base URL for Axios
const axiosInstance = axios.create({
    baseURL: 'https://inventory-iyas.onrender.com',
});

export default axiosInstance;
