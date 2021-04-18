import './index.scss';
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Configure Firebase.
const config = {
    apiKey: 'AIzaSyDM8BWZASPQwX7k2gnar5GnALuwLYxRlY4',
    authDomain: 'basic-shop-first-deploy.herokuapp.com',
    // ...
};
firebase.initializeApp(config);

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

function Login(props) {
    const [isSignedIn, setIsSignedIn] = useState(false);
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
            setIsSignedIn(!!user);
            const token = await user.getIdToken();
        });

        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
    }, []);
    if (!isSignedIn) {
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
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
                <div>
                    <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
                    <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
                </div>
            </div>
        </div>
    );
}

export default Login;