import './OrderProduct.scss'
import React, { useEffect, useState } from 'react';
import { products } from '../../api/productdata';
import { removeFromCart, updateInCart } from './../../actions/cart.action';
import { connect } from 'react-redux';
import { changeMessage } from './../../actions/message.action';
import * as Message from './../../constants/Messages';

function OrderProduct(props) {
    const [CartItems, setCartItems] = useState([])
    // const Carts = localStorage.getItem('cartItems');
    const { Carts } = props;
    console.log(Carts)

    useEffect(() => {
        setCartItems(Carts)
    }, [Carts]);
    const onUpdateToCart = (product, quantity) => {
        props.updateInCart(product, quantity)
        props.changeMessage(Message.MSG_UPDATE_CART_SUCCESS)
    }
    const onRemoveFromCart = (product) => {
        props.removeFromCart(product);
        props.changeMessage(Message.MSG_REMOVE_CART_SUCCESS)
    }
    const totalCount = () => {
        let totalCount = 0;
        if (CartItems && CartItems.length > 0) {
            CartItems.map(item => {
                totalCount += item.count
            })
        }
        return totalCount
    }
    const totalPrice = () => {
        let totalPrice = 0;
        if (CartItems && CartItems.length > 0) {
            CartItems.map(item => {
                totalPrice += item.count * item.product.price.salePrice
            })
        }
        return totalPrice
    }

    const onCloseModal = () => {
        document.getElementById('checkout-cart').style.display = "none";
    }
    return (
        <div className="checkout-order" id="checkout-cart">
            <div className="open-modal">
                <div className="modal-header">
                    <h1>Giỏ hàng của bạn ({totalCount()} sản phẩm)</h1>
                    <h1 className="total-price">Tổng giá: {totalPrice()} vnđ</h1>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {CartItems && CartItems.length > 0 ? CartItems.map(CartItem => {
                            return (
                                <tr key={CartItem.product.id}>
                                    <td>
                                        <div className="cart-product-infor">
                                            <div className="cart-image"><img src={CartItem.product.image} alt='khong the hien thi hinh anh' /></div>
                                            <div className="cart-product-text">
                                                <div className="product-name">{CartItem.product.name}</div>
                                                <br />
                                                <div className="delete-product" onClick={() => onRemoveFromCart(CartItem.product)}><i className="fas fa-trash-alt"></i> Xóa sản phẩm</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cart-product-price">{CartItem.product.price.salePrice} vnđ</div>
                                    </td>
                                    <td>
                                        <div className="cart-product-count">
                                            <button disabled={CartItem.count <= 1 && true} className="count-down" onClick={() => { onUpdateToCart(CartItem.product, -1) }}>-</button>
                                            <div>{CartItem.count}</div>
                                            <button className="count-up" onClick={() => { onUpdateToCart(CartItem.product, 1) }}>+</button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="cart-price-total">{CartItem.product.price.salePrice * CartItem.count} vnđ</div>
                                    </td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                </table>
                <div className="modal-footer">
                    <div className="cart-leave" onClick={onCloseModal}><i className="fas fa-arrow-left"></i> Tiếp tục mua hàng</div>
                    <div className="cart-next">Tiến hành thanh toán <i className="fas fa-arrow-right"></i></div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        Carts: state.cartReducers.cartItems
    }
}
const mapDispatchToProps = {
    removeFromCart,
    changeMessage,
    updateInCart
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderProduct);