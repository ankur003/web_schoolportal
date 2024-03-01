import * as Constants from '../Constants';

export const loginAction = (data) => (dispatch) => {
    dispatch({
        type: Constants.LOGIN_SUCCESS,
        payload: data
    })
}

// export const forgetPassword = (data) => (dispatch) => {
//     console.log(data)

// }