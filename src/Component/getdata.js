import React from 'react';
import { products } from './../api/productdata';

const getAll = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(products)
        }, 500);
    })
}

export default {
    getAll,
}