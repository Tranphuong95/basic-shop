import './index.scss';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure Firebase.
const config = {
    apiKey: 'AIzaSyAeue-AsYu76MMQlTOM-KlbYBlusW9c1FM',
    authDomain: 'myproject-1234.firebaseapp.com',
    // ...
};
firebase.initializeApp(config);

function Login(props) {

    return (
        <div className="login">
            <div className="form-login">
                <h2>Login Form</h2>
                <form>
                    <div className="form-container">
                        <label><strong>Email</strong></label>
                        <input type='email' placeholder="Điền email của bạn" required />
                        <label><strong>Password</strong></label>
                        <input type='password' placeholder="Điền mật khẩu của bạn" required />
                    </div>
                    <button type="submit" className="btn-form-login">Đăng nhập</button>
                </form>
                <p>Bạn chưa có tài khoản <strong>Đăng ký</strong></p>
                <p>or login with social account</p>
            </div>
        </div>
    );
}

export default Login;