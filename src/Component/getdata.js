
import { products } from './../api/productdata';

const getAll = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(products)
        }, 0);
    })
}

export default {
    getAll
}