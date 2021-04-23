import React from 'react';

function ProductManageDetail(props) {
    console.log(props.match.params.id)
    return (
        <div>
            <h1>Day la trang detail</h1>
            <h2>{props.match.params.id}</h2>
        </div>
    );
}

export default ProductManageDetail;