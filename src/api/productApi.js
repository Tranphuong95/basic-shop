import axios from "axios";
import axiosClient from "./axiosClient";
import axiosLocal from "./axiosLocal";

const productApi = {

    getAll: (params) => {
        const url = '/products';
        return axiosClient.get(url, {
            params,
            // headers: {
            //     'testTing': 'test1'
            // }
            // baseURL:'abc/api'
        });
    },

    get: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url)
    },

    getAllLocal: (params) => {
        const url = '/products';
        return axiosLocal.get(url, {
            params
        })
    }
}

export default productApi;