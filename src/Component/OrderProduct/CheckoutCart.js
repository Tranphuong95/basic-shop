import './index.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { deleteCart } from './../../actions/cart.action';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

CheckoutCart.propTypes = {
};

function CheckoutCart(props) {
    const [diachiList, setDiachiList] = useState([]);
    const [tenQuan, setTenQuan] = useState([]);
    const [tenXa, setTenXa] = useState([]);
    const [statusApi, setStatusApi] = useState('');
    //   const [CartItems, setCartItems] = useState([]);
    const [provinceNames, setProvinceNames] = useState('');
    const [districtNames, setDistrictNames] = useState('');

    const initialState = {
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        message: '',
        products: [],
        // totalPrice: totalPrice(),
        provinceName: '',
        districtName: '',
        WardName: ''
    }
    const [informationProducts, setInformationProducts] = useState(initialState);

    const JsonCartItems = localStorage.getItem('cartItems');
    const CartItems = JSON.parse(JsonCartItems);
    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
            headers: { Token: 'e1266833-639e-11eb-86b9-8a61086fe5fd' },
        }).then(response => setDiachiList(response.data.data))
            .catch(error => alert(error.message));
        // return () => getDiachi()
    }, []);

    const showProvinceName = (event) => {
        const province = event.target.options[event.target.selectedIndex].text;
        setProvinceNames(province);
    }

    const findProvinceId = event => {
        axios({
            method: 'post',
            url: ' https://online-gateway.ghn.vn/shiip/public-api/master-data/district',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Token: 'e1266833-639e-11eb-86b9-8a61086fe5fd',
            },
            data: {
                province_id: JSON.parse(event.target.value),
            },
        }).then(response => setTenQuan(response.data.data));
        // onHandleChange(event)
        showProvinceName(event);
    };
    const showDistrictName = (event) => {
        const disTrict = event.target.options[event.target.selectedIndex].text;
        setDistrictNames(disTrict);
    }
    const findDistrictId = event => {
        axios({
            method: 'post',
            url: 'https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Token: 'e1266833-639e-11eb-86b9-8a61086fe5fd',
            },
            data: {
                district_id: JSON.parse(event.target.value),
            },
        }).then(response => setTenXa(response.data.data));
        // onHandleChange(event)
        showDistrictName(event);
    };

    const onHandleChange = event => {
        setInformationProducts({
            ...informationProducts,
            [event.target.name]: event.target.value,
            products: CartItems,
            //   totalPrice: totalPrice(),
            provinceName: provinceNames,
            districtName: districtNames
        });
    };

    const totalPrice = () => {
        let totalPrice = 0;
        if (CartItems && CartItems.length > 0) {
            CartItems.map(item => {
                totalPrice += item.count * item.product.price.salePrice
            })
        }
        return totalPrice
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if (CartItems && CartItems.length > 0) {
            axios({
                method: 'post',
                url: 'http://localhost:4001/informationOrder',
                data: informationProducts
            })
                .then(res => {
                    setStatusApi(res.status);
                    if (res.status === 201) {
                        localStorage.setItem('cpid', JSON.stringify(res.data.id));
                        props.deleteCart();

                        setInformationProducts(initialState);
                        setDiachiList([]);
                        setTenQuan([]);
                        setTenXa([])
                    };
                });
        }

    }
    if (statusApi === 201) {
        console.log(statusApi)
        return (<Redirect to='/complete-order' />)
    }
    console.log(CartItems)
    console.log(diachiList)
    console.log(tenQuan)
    console.log(tenXa)
    console.log(provinceNames)
    console.log(districtNames)
    console.log(informationProducts)
    return (
        <div className='checkout'>
            <div className='checkout-cart'>
                <h1>?????T H??NG</h1>
                <div className='form-checkout'>
                    <div className='form'>
                        <h3>Th??ng tin thanh to??n</h3>
                        <form onSubmit={onSubmit}>
                            <div className='form-group'>
                                <label className='left'>Name</label>
                                <input className='right' name='name' type='text' value={informationProducts.name} onChange={onHandleChange} placeholder='' />
                            </div>
                            <div className='form-group'>
                                <label className='left'>PhoneNumber</label>
                                <input className='right' name='phoneNumber' type='text' value={informationProducts.phoneNumber} onChange={onHandleChange} placeholder='' />
                            </div>
                            <div className='form-group'>
                                <label className='left'>Email</label>
                                <input className='right' name='email' type='email' value={informationProducts.email} onChange={onHandleChange} placeholder='' />
                            </div>
                            <div className='form-group'>
                                <label className='left'>T???nh/th??nh ph???</label>
                                <select className='right' name='provinceId' id='provinceId' onChange={findProvinceId}>
                                    <option value="">--Ch???n th??nh ph???--</option>
                                    {diachiList && diachiList.length > 0
                                        ? diachiList.map((item, index) => {
                                            return (
                                                <option key={index * 111} value={item.ProvinceID}>
                                                    {item.ProvinceName}
                                                </option>
                                            );
                                        })
                                        : ''}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label className='left' >Ch???n qu???n/huy???n</label>
                                <select className='right' name='tenQuan' id='tenQuan' onChange={findDistrictId}>
                                    <option value="">--Quan/huyen--</option>
                                    {tenQuan && tenQuan.length > 0
                                        ? tenQuan.map((item, index) => {
                                            return (
                                                <option key={index * 111} value={item.DistrictID}>
                                                    {item.DistrictName}
                                                </option>
                                            );
                                        })
                                        : ''}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label className='left'>Ph?????ng/x??</label>
                                <select className='right' name='tenXa' id='tenXa' onChange={onHandleChange}>
                                    <option value="">--Ch???n Phuong/xa--</option>
                                    {tenXa && tenQuan.length > 0
                                        ? tenXa.map((item, index) => {
                                            return (
                                                <option key={index * 111} value={item.WardID}>
                                                    {item.WardName}
                                                </option>
                                            );
                                        })
                                        : ''}
                                </select>
                            </div>
                            <div className='form-group'>
                                <label className='left'>Adress</label>
                                <input className='right' name='address' type='text' value={informationProducts.address} onChange={onHandleChange} placeholder='' />
                            </div>
                            <div className='form-group'>
                                <label className='left'>Message</label>
                                <textarea className='right' name='message' type='text' value={informationProducts.message} onChange={onHandleChange} placeholder='' />
                            </div>
                            <div className='btn-right'>
                                <button type='submit'>Ti???p t???c  <i className="fas fa-arrow-right"></i></button>
                            </div>
                        </form>
                    </div>
                    <div className='infor-product'>
                        <h3>Th??ng tin s???n ph???m</h3>
                        {CartItems && CartItems.length > 0 ? CartItems.map(item => {
                            console.log(item.product.id)
                            return (
                                <div key={233 * item.product.id}>
                                    <div className="product">
                                        <div className="image">
                                            {/* <NavLink to={item.product.url}> */}
                                            <img src={item.product.image} />
                                            {/* </NavLink> */}
                                        </div>
                                        <div className="title-product ">
                                            {/* <NavLink to={item.product.url}>{item.product.title}</NavLink> */}
                                            <h5>{item.product.name}</h5>
                                        </div>
                                        <div className="price">
                                            <div className="tt-price">{Number(item.product.price.salePrice).toLocaleString()}???</div>
                                            <div className="quantity">x{item.count}</div>
                                            <div className="tt-price">
                                                <strong>{(item.count * Number(item.product.price.salePrice)).toLocaleString()}???</strong>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </div>

                            )
                        }) : (<h3><strong>B???n ch??a ????ng k?? mua s???n ph???m n??o</strong></h3>)}
                        <div className="total-price">
                            <div>
                                T???ng ti???n: <strong>{totalPrice().toLocaleString()}??</strong>
                            </div>
                            <div>C?????c v???n chuy???n</div>
                            <div>
                                S??? ti???n c???n thanh to??n:<strong>{totalPrice().toLocaleString()}??</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapDispatchToProps = {
    deleteCart
}
export default connect(null, mapDispatchToProps)(CheckoutCart);