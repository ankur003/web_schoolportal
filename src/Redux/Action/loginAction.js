import * as Constants from '../Constants';

export const loginAction = (data) => (dispatch) => {
    dispatch({
        type: Constants.LOGIN_SUCCESS,
        payload: data
    });
    console.log("loginAction", data);
    // sessionStorage.setItem("role", data?.responseObject?.userType);
    dispatch({
        type: Constants.GET_ROLE,
        payload: data
    })
};



// export const forgetPassword = (data) => (dispatch) => {
//     console.log(data)

// }