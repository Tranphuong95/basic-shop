import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductManageDelete(props) {

    const onDelete = () => {
        if (window.confirm('Bạn đồng ý xóa sản phẩm này?')) {
            axios.delete(`http://localhost:4001/products/${props.match.params.id}`)
                .then(res => console.log(res))
        }
    }
    return (
        <div>
            <h2>Bạn muốn xóa sản phẩm id là {props.match.params.id}</h2>
            <div>
                <Link>Quay lại trang quản lý</Link>
                <button onClick={onDelete}>Xóa sản phẩm</button>
            </div>
        </div>
    );
}

export default ProductManageDelete;