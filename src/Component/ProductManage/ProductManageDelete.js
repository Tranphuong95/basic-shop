import axios from 'axios';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

function ProductManageDelete(props) {
    const [isSuccess, setIsuccess] = useState(false);

    const onDelete = () => {
        if (window.confirm('Bạn đồng ý xóa sản phẩm này?')) {
            axios.delete(`https://first-json-server-demo.herokuapp.com/products/${props.match.params.id}`)
                .then(res => {
                    if (res.status === 200) {
                        setIsuccess(true)
                    }
                })
        }
    }
    if (isSuccess === true) {
        return <Redirect to="/product-manage" />
    }
    return (
        <div>
            <h2>Bạn muốn xóa sản phẩm id là {props.match.params.id}</h2>
            <div>
                <Link to='/product-manage'>Quay lại trang quản lý</Link>
                <button onClick={onDelete}>Xóa sản phẩm</button>
            </div>
        </div>
    );
}

export default ProductManageDelete;