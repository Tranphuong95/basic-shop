import axiosClient from "./axiosClient";

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
    }
}

export default productApi;