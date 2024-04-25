import {useContext} from "react";
import axios from 'axios';

import {UserContext} from "../context/userContext";


const PATH = import.meta.env.VITE_PATH;

const instance = axios.create({
    baseUrl: `${PATH}`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(
    async (config) => {
        const {token} = useContext(UserContext);
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;