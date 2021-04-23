import axios from "axios";
import queryString from 'query-string';

const axiosLocal = axios.create({
    baseURL: process.env.REACT_APP_API_URL_LOCAL,
    headers: {
        'content-type': 'aplication/json'
    },
    paramsSerializer: params => queryString.stringify(params)
})
axiosLocal.interceptors.request.use(config => {
    return config
})
axiosLocal.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data
    }
    return response;
}, (error) => {
    // Handle errors
    throw error
});

export default axiosLocal;