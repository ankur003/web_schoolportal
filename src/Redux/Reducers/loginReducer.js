import * as Constants from '../Constants';

const initialState = {
    message: {},
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.LOGIN_SUCCESS:
            return {
                ...state,
                message: action.payload.data,
            }
        // case Constants.GET_LOGIN_FAILURES:
        //     console.log("reducer", action)
        //     return {
        //         ...state,
        //         message: action.payload.data.message,
        //     }
        // case Constants.SET_LOGOUT_USER:
        //     console.log("reducer", action)
        //     return {
        //         ...state,
        //         message: action.payload,
        //     }
        default:
            return state;
    }
}