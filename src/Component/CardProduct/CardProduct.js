import './CardProduct.scss';
import React, { useEffect, useState } from 'react';
import getData from './../getdata'
import { addToCart } from '../../actions/cart.action';
import { fetchProducts } from './../../actions/products.action';
import { changeMessage } from './../../actions/message.action';
import { connect, useDispatch } from 'react-redux';
import * as Message from './../../constants/Messages';
import productApi from '../../api/productApi';

const CardProduct = (props) => {
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     const main = async () => {
    //         try {
    //             const response = await getData.getAll()
    //             setProducts(response)
    //             window.console.log(response)
    //         } catch (error) {
    //             console.log('Failed to fetch student list:', error)
    //         }
    //     }
    //     return main()
    // }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(props.fetchProducts)
    }, [dispatch]);

    useEffect(() => {
        const getProduct = async () => {

            try {
                const params = {
                    _page: 1,
                    _limit: 10
                    // salePrice: 95000
                }
                const response = await productApi.getAll(params);
                // const response = await productApi.get(1);
                console.log(response)
            } catch (error) {
                console.log('Failer request call api product:', error)
            }
        };
        getProduct()
        // return () => { getProduct() } // cleanup function
    }, []);

    const { products } = props;
    // console.log('Process', process)
    const onAddToCart = (product) => {
        props.addToCart(product, 1);
        props.onOpenModal();
        props.changeMessage(Message.MSG_ADD_TO_CART_SUCCESS);
    }
    return (
        <div className="product-grid">
            {products && products.length > 0 ? products.map(item => (
                <div className="card-product" key={item.id}>
                    <div className="card-image">
                        <img src={item.image} alt="ao short nam" />
                    </div>
                    <div className="title"><h2>{item.name}</h2></div>
                    <br />
                    <div className="card-main">
                        <div className="price">
                            <div className="sale-price">{item.price.salePrice} vnd</div>
                            <div className="old-price">{item.price.oldPrice} vnd</div>
                            <div>-40%</div>
                        </div>
                    </div>
                    <br />
                    <div className="card-footer">
                        <div className="card-more-infor">TÌM HIỂU THÊM</div>
                        <div className="cart" onClick={() => onAddToCart(item)}>
                            <i className="fas fa-cart-arrow-down"></i>
                        </div>
                    </div>
                </div>
            )) : ('')}

        </div>
    );
};
const mapStateToProps = (state) => {
    console.log(state)
    return {
        cartItems: state.cartReducers.cartItems,
        products: state.productReducers.products
    }
}
const mapDispatchToProps = {
    addToCart,
    fetchProducts,
    changeMessage
}
export default connect(mapStateToProps, mapDispatchToProps)(CardProduct);