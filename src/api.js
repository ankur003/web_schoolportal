import axios from 'axios';
import { getCurrentAcademicYear } from './academicYearStore';

axios.interceptors.request.use(
  (config) => {
    let token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role"); 
    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = token;
    config.headers["Cache-control"] = "no-cache";
    config.headers['Access-Control-Allow-Origin'] = "*"; 
    config.headers['mode'] = 'no-cors';
    const year = getCurrentAcademicYear();
    if(year) {
      config.headers['user_academic_year'] = year;
    }
    return config;
  },
  (error) => {
    // Handle errors that occurred during request setup
    console.log({ error });
    return Promise.reject(error);
  }
);

export default axios;



