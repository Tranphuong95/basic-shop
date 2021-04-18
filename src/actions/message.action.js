import *as Types from './../constants/ActionTypes'
export const changeMessage = message => (dispatch) => {
    const x = document.getElementById('toast-message');
    x.className = 'toast-show';
    console.log(x.className)
    setTimeout(() => {
        x.className = x.className.replace('toast-show', '')
    }, 3000)
    dispatch({
        type: Types.CHANGE_MESSAGE,
        payload: { message },
    });
}