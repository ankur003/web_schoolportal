import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role"); 
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = token;
    return config;
  },
  (error) => {
    // Handle errors that occurred during request setup
    console.log({ error });
    return Promise.reject(error);
  }
);

export default axios;



