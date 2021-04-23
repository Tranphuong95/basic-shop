import './index.scss';
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import axios from 'axios';

ProductManagerUpdate.propTypes = {
    product: PropTypes.object,
    price: PropTypes.object
}
ProductManagerUpdate.defaultProps = {
    product: {},
    price: {}
}

function ProductManagerUpdate(props) {
    const [isNew] = useState(!props.match.params || !props.match.params.id)
    const [price, setPrice] = useState({
        oldPrice: 0,
        salePrice: 0,
        percentSale: 0
    })
    const [product, setProduct] = useState({
        name: '',
        image: '',
        description: '',
        price: price,
        inventory: 0
    })

    useEffect(() => {
        if (!isNew) {
            axios.get(`http://localhost:4001/products/${props.match.params.id}`, {
                // params: { id: props.match.params.id }
            }).then(res => { setProduct(res.data); setPrice(res.data.price) })
        }
    }, [])

    const onHandleChangePrice = async (event) => {
        await setPrice({
            ...price,
            [event.target.name]: event.target.value,
        })
        console.log('hello price')
    }
    console.log(price)

    const showPercentSale = () => {
        const oldPrice = price.oldPrice;
        const salePrice = price.salePrice;
        const percentSale = Math.floor((1 - salePrice / oldPrice) * 100);
        return percentSale
    }

    const onHandleChange = (event) => {

        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        })
        console.log('hello infor')
    }

    const onSubmit = (event) => {
        event.preventDefault()
        if (isNew) {
            axios.post('http://localhost:4001/products', {
                id: product.id,
                name: product.name,
                image: product.image,
                description: product.description,
                price: {
                    oldPrice: Number(price.oldPrice),
                    salePrice: Number(price.salePrice),
                    percentSale: showPercentSale()
                },
                inventory: Number(product.inventory)
            })
        }
        else axios.put(`http://localhost:4001/products/${props.match.params.id}`, {
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: {
                oldPrice: Number(price.oldPrice),
                salePrice: Number(price.salePrice),
                percentSale: showPercentSale()
            },
            inventory: Number(product.inventory)
        })
    }
    console.log(product)
    console.log(!isNew)
    return (
        <div className='product-update'>
            {!isNew ?
                (<div className='form-content'>
                    <h2>Thay đổi sản phẩm</h2>
                    <form onSubmit={onSubmit}>
                        <label>Name</label>
                        <input type='text' name='name' value={product.name || ''} onChange={onHandleChange} placeholder='Nhap ten san pham' />
                        <label>Image</label>
                        <input type='text' name='image' value={product.image || ''} onChange={onHandleChange} placeholder='Nhap dia chi hinh anh' />
                        <label>Description</label>
                        <input type='text' name='description' value={product.description || ''} onChange={onHandleChange} placeholder='Nhap mo ta san pham' />
                        <label>OldPrice</label>
                        <input type='number' name='oldPrice' value={price ? price.oldPrice : 0} onChange={onHandleChangePrice} placeholder='Nhap gia cu cua san pham' />
                        <label>SalePrice</label>
                        <input type='number' name='salePrice' value={price ? price.salePrice : 0} onChange={onHandleChangePrice} placeholder='Nhap gia moi cua san pham' />
                        {/* <label>PercentSale</label> */}
                        {/* <input /> */}
                        <label>Inventory</label>
                        <input type='number' name='inventory' value={product.inventory || ''} onChange={onHandleChange} placeholder='Nhap so luong san pham' />
                        <div className='update-btn'>
                            <button className='btn-back'>Quay về trang quản lý</button>
                            <button type='submit' className='btn-save'>Lưu thay đổi</button>
                        </div>
                    </form>
                </div>
                ) : (<div className='form-content'>
                    <h2>Thêm sản phẩm mới</h2>
                    <form onSubmit={onSubmit}>
                        <label>Name</label>
                        <input type='text' name='name' value={product.name || ''} onChange={onHandleChange} placeholder='Nhap ten san pham' />
                        <label>Image</label>
                        <input type='text' name='image' value={product.image || ''} onChange={onHandleChange} placeholder='Nhap dia chi hinh anh' />
                        <label>Description</label>
                        <input type='text' name='description' value={product.description || ''} onChange={onHandleChange} placeholder='Nhap mo ta san pham' />
                        <label>OldPrice</label>
                        <input type='number' name='oldPrice' value={price ? price.oldPrice : 0} onChange={onHandleChangePrice} placeholder='Nhap gia cu cua san pham' />
                        <label>SalePrice</label>
                        <input type='number' name='salePrice' value={price ? price.salePrice : 0} onChange={onHandleChangePrice} placeholder='Nhap gia moi cua san pham' />
                        {/* <label>PercentSale</label> */}
                        {/* <input /> */}
                        <label>Inventory</label>
                        <input type='number' name='inventory' value={product.inventory || ''} onChange={onHandleChange} placeholder='Nhap so luong san pham' />
                        <div className='update-btn'>
                            <button className='btn-back'>Quay về trang quản lý</button>
                            <button type='submit' className='btn-save'>Thêm sản phẩm</button>
                        </div>
                    </form>
                </div>
                )}
        </div>
    );
}

ProductManagerUpdate.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.object,
        inventory: PropTypes.number
    }),
    price: PropTypes.shape({
        oldPrice: PropTypes.number,
        salePrice: PropTypes.number,
        percentSale: PropTypes.number
    })
}

export default ProductManagerUpdate;