import axios from 'axios';


export const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` }
};


const URL_API = 'http://localhost:80/api/'

export const api = axios.create({
    baseURL:URL_API
})

