
import { products } from './../api/productdata';

const getAll = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(products)
        }, 300);
    })
}

// export default {getAll}
export default getAll;