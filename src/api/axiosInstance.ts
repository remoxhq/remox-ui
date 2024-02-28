import axios from 'axios';
import Cookies from 'js-cookie';
import * as jose from "jose";

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
      const decodedToken = jose.decodeJwt(token)
      config.headers['Address'] = decodedToken.publicKey;
    }
    return config;
  },
  (error) => {
    console.error('Request Error Interceptor:', error);
    return Promise.reject(error);
  }
);


export default instance;
