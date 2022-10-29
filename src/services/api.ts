import axios from 'axios';

const URL_API = 'http://localhost:80/api/'

export const api = axios.create({
    baseURL:URL_API
})

