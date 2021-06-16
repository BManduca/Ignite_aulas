import axios from 'axios';

//criando uma instância do axios
export const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})