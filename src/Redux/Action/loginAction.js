import * as Constants from '../Constants';

export const loginAction = (data) => (dispatch) => {
    dispatch({
        type: Constants.LOGIN_SUCCESS,
        payload: data
    });
    dispatch({
        type: Constants.GET_ROLE,
        payload: data
    })
};