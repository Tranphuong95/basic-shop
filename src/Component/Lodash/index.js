import React, { useState, useEffect, useCallback } from 'react';
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
const Clock = (props) => {
    const [Minute, setMinute] = useState(moment().format('LTS'));
    useEffect(() => {
        const setTime = setInterval(() => {
            setMinute(moment().format('LTS'))
        }, 1000)
        return () => {
            clearInterval(setTime)
        }

    }, []);
    const { onShowMinute } = props;
    const ClockShowMinute = () => {
        const abc = [{ name: 'Hoa', id: 1 }, { name: 'Hung', id: 2 }, { name: 'Hoang', id: 3 }]
        if (onShowMinute) {
            onShowMinute(Minute)
        }
        console.log('hello')
    }
    console.log(Minute)
    return (
        <div>
            <h2><span>{moment().format('LL')}</span> <span>{Minute}</span></h2>
            <button onClick={ClockShowMinute}>ShowMinute</button>
        </div>
    )
}
function Lodash(props) {
    const ListItems = useSelector(state => state.cartReducers.cartItems);
    const ListProducts = useSelector(state => state.productReducers.products);
    const LastItem = _.last(ListProducts.data);

    const [isHiden, setIsHiden] = useState(false);
    const [Number, setNumber] = useState('');
    console.log('ListItems', ListItems);
    console.log('ListProduct', ListProducts);
    console.log('LastItem', LastItem)

    const onHiden = () => {
        setIsHiden(!isHiden)
    }
    // const abc = [{ name: 'Hoa', id: 1 }, { name: 'Hung', id: 2 }, { name: 'Hoang', id: 3 }]
    const onShowMinute = (abc) => {
        setNumber(abc)
    }

    function pow1(x, n) {
        let result = 1;   // multiply result by x n times in the loop   
        for (let i = 0; i < n; i++) {
            result *= x;
        }
        return result;
    }
    console.log(pow1(2, 3)); // 8

    function pow2(x, n) {
        if (n === 0) return 1;
        if (n === 1) {
            return x;
        } else {
            return x * pow2(x, n - 1);
        }
    }
    console.log(pow2(2, 3)); // 8
    // let company = { // the same object, compressed for brevity
    //     sales: [{ name: 'John', salary: 1000 }, { name: 'Alice', salary: 1600 }],
    //     development: {
    //         sites: [{ name: 'Peter', salary: 2000 }, { name: 'Alex', salary: 1800 }],
    //         internals: [{ name: 'Jack', salary: 1300 }]
    //     }
    // };
    const company = [{ name: 'John', salary: 1000 }, { name: 'Alice', salary: 1600 }];
    const numbersList = [1, 2, 3, 4, 5]
    const sumSalary = _.sumBy(company, 'salary')
    console.log('sumSalary', sumSalary)
    const sumForSalary = () => {
        let sum = 0
        for (const number of company) {
            console.log('number', number.salary)
            sum += number.salary
        }
        return sum;
    }
    console.log('sumForSalary', sumForSalary())
    // The function to do the job
    // function sumSalaries(department) {
    //     console.log(Array.isArray(department))
    //     if (Array.isArray(department)) { // case (1)
    //         return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
    //     }

    //     else { // case (2)
    //         let sum = 0;
    //         for (let subdep of Object.values(department)) {
    //             sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    //         }
    //         return sum;
    //     }
    // }
    // alert(sumSalaries(company)); // 7700
    const onHi = useCallback((a) => {
        console.log(a)
    }, [])
    const aaa = moment().startOf('minute').format('LTS')
    const bbb = moment(aaa, 'LTS').fromNow();
    console.log(bbb)
    console.log(aaa)
    return (
        <div>
            <h1>Trang test Lodash</h1>
            {Number}
            <button onClick={onHiden}>{isHiden ? 'ShowTime' : 'Hiden Time'}</button>
            {isHiden ? '' : <Clock onShowMinute={onShowMinute} />}
            {aaa}
            {/* <h2><span>{moment().format('LL')}</span> <span>{Minute}</span></h2> */}
            <button onClick={() => onHi("hello Callback")}>HI</button>
        </div>
    );
}

export default Lodash;