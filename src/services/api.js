import axios from 'axios';

// Define a URL base da API
const api = axios.create({
  baseURL: window.REACT_APP_API_URL,
});

export default api;
