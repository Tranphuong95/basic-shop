import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import { IsLogin } from './Login'
import { Redirect } from 'react-router';

const SignUp = () => {
    document.title = "Trang đăng xuất"
    const [isSingUp, setIsSingUp] = useState(false);
    const isLogin = IsLogin();
    const onSingUp = () => {
        firebase.auth().signOut()
        setIsSingUp(true)
    }
    console.log('isSingUp', isSingUp);

    if (isSingUp) {
        // clearTimeout(checkLogin)
        return <Redirect to="/login" />
    }
    return (
        <div>
            {isLogin ? <div>
                <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
                <button onClick={onSingUp}>Sign-out</button>
            </div> : ('')}
        </div>
    );
}

export default SignUp;