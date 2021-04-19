import './index.scss';
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { Redirect } from 'react-router';

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
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        // signInSuccessWithAuthResult: () => false,
    },
};

function Login(props) {
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
    if (!isSignedIn) {
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
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div>
            </div>
        );
    }
    return (
        // <Redirect path='/' />
        <div>
            <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
            <button onClick={() => firebase.auth().signOut()}>Sign-out</button>
        </div>
    )

}

export default Login;