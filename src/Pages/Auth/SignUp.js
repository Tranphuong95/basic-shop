import './index.scss';
import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { IsLogin } from './Login'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const SignUp = () => {
    document.title = "Trang đăng xuất"
    const [isSingUp, setIsSingUp] = useState(false);
    const isLogin = IsLogin();
    const onSingUp = () => {
        firebase.auth().signOut()
        setIsSingUp(true);
    }
    console.log('isSingUp', isSingUp);

    return (
        <div className="sign-up">
            {isLogin ? <div>
                <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
                <button onClick={onSingUp}>Sign-out</button>
            </div> : (
                <div className="sign-up-success">
                    <h2>Bạn đã đăng xuất hoặc chưa đăng nhập</h2>
                    <br />
                    <p>Vui lòng đăng nhập để sử dụng thêm dịch vụ của chúng tôi</p>
                    <Link to='/login'>Đăng nhập</Link>
                </div>
            )}
        </div>
    );
}

export default SignUp;