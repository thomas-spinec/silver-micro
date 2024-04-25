import {useContext} from "react";
import axios from 'axios';




const PATH = import.meta.env.VITE_PATH;

const instance = axios.create({
    baseURL: `${PATH}`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
}

);

instance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;