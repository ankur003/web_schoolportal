import * as Constants from '../Constants';

const initialState = {
    message: {},
    role: "",
    userId: {},
    loginUserId: "",
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.LOGIN_SUCCESS:
            return {
                ...state,
                message: action.payload.data,
            }
        case Constants.GET_ROLE:
            console.log("reducer", action.payload)
            return {
                ...state,
                role: action.payload,
            }
        case Constants.GET_USER_ID:
            console.log("reducer", action.payload);
            return {
                ...state,
                userId: action.payload,
            }
        case Constants.LOGIN_GET_USER_ID:
            console.log("reducer", action.payload);
            return {
                ...state,
                loginUserId: action.payload,
            }
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