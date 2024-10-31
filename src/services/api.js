import axios from 'axios';

// Define a URL base da API
const api = axios.create({
  baseURL: 'https://6720e05a98bbb4d93ca6769e.mockapi.io/movies', // URL da sua API
});

export default api;
