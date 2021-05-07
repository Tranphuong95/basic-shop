import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// import 'lodash'
import _ from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
moment.locale('vi')
Lodash.propTypes = {
    ListItems: PropTypes.array,
    ListProducts: PropTypes.array
};
Lodash.defaultProps = {
    ListItems: [],
    ListProducts: []
}
const Clock = () => {
    const [Minute, setMinute] = useState(moment().format('LTS'));
    useEffect(() => {
        const setTime = setInterval(() => {
            setMinute(moment().format('LTS'))
        }, 1000)
        return () => {
            clearInterval(setTime)
        }

    }, []);
    console.log(Minute)
    return (
        <div>
            <h2><span>{moment().format('LL')}</span> <span>{Minute}</span></h2>
        </div>
    )
}
function Lodash(props) {
    const ListItems = useSelector(state => state.cartReducers.cartItems);
    const ListProducts = useSelector(state => state.productReducers.products);
    const LastItem = _.last(ListProducts.data);

    const [isHiden, setIsHiden] = useState(false);
    console.log('ListItems', ListItems);
    console.log('ListProduct', ListProducts);
    console.log('LastItem', LastItem)


    const onHiden = () => {
        setIsHiden(!isHiden)
    }

    return (
        <div>
            <h1>Trang test Lodash</h1>

            <button onClick={onHiden}>{isHiden ? 'ShowTime' : 'Hiden Time'}</button>
            {isHiden ? '' : <Clock />}
            {/* <h2><span>{moment().format('LL')}</span> <span>{Minute}</span></h2> */}
        </div>
    );
}

export default Lodash;