import './index.scss'
import React, { useEffect } from 'react';
import { fetchProducts } from './../../actions/products.action';
import { changeMessage } from './../../actions/message.action';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { createLogger } from 'redux-logger';

const ProductManage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(props.fetchProducts)
    }, [dispatch]);

    const { data } = props;
    console.log(data);
    const products = data && data.data
    const loading = data && data.loading
    console.log(props.match)

    return (
        <div className="product-manage">
            <div className="content">
                <h2>Chào mừng đến trang quản lý sản phẩm</h2>
                {loading ? (<h3>...loading</h3>) : ('')}
                <div className='add-product'>
                    <Link to={`${props.match.url}/new`}>Thêm sản phẩm mới</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Image</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Inventory</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products && products.length > 0 ? products.map(product => {
                            console.log(typeof product.price.oldPrice)
                            return (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td className='image'>
                                        <img src={product.image} alt='product' />
                                    </td>
                                    <td className='price'>
                                        <div>
                                            <div>OldPrice: {product.price.oldPrice.toLocaleString()} vnđ</div>
                                            <div>SalePrice: {product.price.salePrice.toLocaleString()} vnđ</div>
                                            <div>PercentPrice: {product.price.percentSale.toLocaleString()}%</div>
                                        </div>
                                    </td>
                                    <td>{product.description}</td>
                                    <td>{product.inventory}</td>
                                    <td>
                                        <div className='product-edit'>
                                            <div className='view'>
                                                <Link to={`${props.match.url}/${product.id}`}>Xem</Link>
                                            </div>
                                            <div className='edit'>
                                                <Link to={`${props.match.url}/${product.id}/update`}>Sửa</Link></div>
                                            <div className='delete'>
                                                <Link to={`${props.match.url}/${product.id}/delete`}>Xóa</Link></div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }) : (null)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.productReducers.data
    }
}
const mapDispatchToProps = {
    fetchProducts,
    changeMessage
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);