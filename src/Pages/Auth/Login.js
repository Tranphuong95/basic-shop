import './index.scss';
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { Redirect } from 'react-router';
import axios from 'axios';

// Configure Firebase.
const config = {
    apiKey: process.env.REACT_APP_FIRE_BASE_API,
    authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
    // ...
};
console.log(process.env.REACT_APP_FIRE_BASE_API)
firebase.initializeApp(config);

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    // signInFlow: 'popup',
    signInFlow: 'redirect',
    signInSuccessUrl: "/",
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        // signInSuccessWithAuthResult: () => false,
    },
};
export const IsLogin = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            setIsSignedIn(!!user);
            if (!user) {
                console.log('Bạn chưa đăng nhập')
                return
            }
            const token = await user.getIdToken();
            console.log(token)
        });

        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
    return isSignedIn
}

const Login = (props) => {
    document.title = "Trang đăng nhập";
    console.log(firebase.auth())

    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [rememberStatus, setRemeberStatus] = useState(false);
    const [resRemember, setResRemember] = useState(null);
    const [message, setMessage] = useState(null);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    // const [isSignedIn, setIsSignedIn] = useState(false);
    // useEffect(() => {
    //     const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
    //         setIsSignedIn(!!user);
    //         if (!user) {
    //             console.log('Bạn chưa đăng nhập')
    //             return
    //         }
    //         const token = await user.getIdToken();
    //         console.log(token)
    //     });

    //     return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    // }, []);
    const isSignedIn = IsLogin();
    console.log(isSignedIn)
    // if (!isSignedIn) {
    //     return (
    //         <div>
    //             <h1>My App</h1>
    //             <p>Please sign-in:</p>
    //             <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    //         </div>
    //     );
    // }
    const onChangeStatus = () => {
        setRemeberStatus(!rememberStatus)
    }
    console.log('status', rememberStatus)
    const onHandleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value,
        })
    }
    console.log("user", user)
    const onFormSubmit = (event) => {
        event.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:4001/login',
            data: { ...user, rememberStatus: rememberStatus }
        }).then(res => { setAccessToken(res.data.access_token); setResRemember(res.data.rememberStatus); setMessage(res.data.message); setIsLoginSuccess(res.data.isLoginSuccess) })
    }

    if (accessToken) {
        if (resRemember === true) {
            console.log('status la true')
            localStorage.setItem('access_token', accessToken)
        }
        else if (resRemember === false) {
            console.log('status la false')
            sessionStorage.setItem('access_token', accessToken)
        }
    }

    console.log(isLoginSuccess)
    if (isLoginSuccess === true) {
        return (
            <h3>Login successfully</h3>
        )
    }
    if (!isSignedIn) {
        return (
            <div className="login">
                <div className="form-login">
                    <h2>Login Form</h2>
                    <form onSubmit={onFormSubmit}>
                        <div className="form-container">
                            <label><strong>Email</strong></label>
                            <input type='email' name='email' placeholder="Điền email của bạn" onChange={onHandleChange} required />
                            <label><strong>Password</strong></label>
                            <input type='password' name='password' placeholder="Điền mật khẩu của bạn" onChange={onHandleChange} required />
                            <label>Remember</label>
                            <input type='checkbox' name='rememberPass' onChange={onChangeStatus} checked={rememberStatus} />
                        </div>
                        <button type="submit" className="btn-form-login">Đăng nhập</button>
                    </form>
                    <p>Bạn chưa có tài khoản <strong>Đăng ký</strong></p>
                    <p>or login with social account</p>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            </div>
        );
    }
    return (
        <div>

        </div>
    )
}

export default Login;

