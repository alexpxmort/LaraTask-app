import axios from 'axios';


export const generateConfig =  (token:string) => {
    return {
        headers: { Authorization: `Bearer ${token}` }
    }
};


const URL_API = 'http://localhost:80/api/'

export const api = axios.create({
    baseURL:URL_API
})

