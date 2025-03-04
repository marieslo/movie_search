import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY, 
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Request Error:', error.response ? error.response.data : error.message);
    return Promise.reject(error);
  }
);