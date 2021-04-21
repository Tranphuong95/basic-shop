import './404.scss'
import React from 'react';
import { Link } from 'react-router-dom';

function Page404(props) {
    document.title = "404 Page Error";
    return (
        <div className="page-error-container">
            <div className="content">
                <h2>404</h2>
                <h4>OH! TRANG NÀY KHÔNG TỒN TẠI</h4>
                <p>Trang bạn tìm kiếm không tồn tại. Trang này có thể bị di chuyển đến một địa chỉ khác</p>
                <Link to='/'>QUAY LẠI TRANG CHỦ</Link>
            </div>
        </div>
    );
}

export default Page404;