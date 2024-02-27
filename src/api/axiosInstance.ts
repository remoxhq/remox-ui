import axios from 'axios';
import Cookies from 'js-cookie';


const instance = axios.create({
  baseURL: import.meta.env.VITE_Base_API, 
  timeout: 10 * 60 * 1000, // 10 mins
  headers: {
    'Content-Type': 'application/json',
  },
});


instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('JWT');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request Error Interceptor:', error);
    return Promise.reject(error);
  }
);


export default instance;
