import * as Types from '../constants/ActionTypes';
import * as Messages from '../constants/Messages'

const initialState = Messages.MSG_WELL_COME
const MessageReducers = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_MESSAGE:
            return action.payload.message
        default:
            return state
    }
}
export default MessageReducers;