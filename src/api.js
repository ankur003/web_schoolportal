import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role"); 
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = token;
    // config.headers["Cache-control"] = "no-cache";
    // config.headers['Access-Control-Allow-Origin'] = "*"; 
    // config.headers['mode'] = 'no-cors';
    //  config.headers['user_academic_year'] = 'YEAR_2025_2026';
    return config;
  },
  (error) => {
    // Handle errors that occurred during request setup
    console.log({ error });
    return Promise.reject(error);
  }
);

export default axios;



