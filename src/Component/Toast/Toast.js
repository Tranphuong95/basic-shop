import './Toast.scss';
import React, { useEffect } from 'react';
import *as Messages from './../../constants/Messages';
import { connect } from 'react-redux';

const Toast = (props) => {
    const { Message } = props;
    return (
        <div className="toast-message" id="toast-message">
            {Message}
        </div>
    );
}

const mapStateToProps = (state) => {
    console.log(state.messageReducers)
    return {
        Message: state.messageReducers
    }
}

export default connect(mapStateToProps, null)(Toast);