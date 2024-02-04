// import axios from 'axios';
import * as Constants from '../Constants';


export const loginAction = (data) => (dispatch) => {
    sessionStorage.setItem("token",true)
    dispatch({
        type: Constants.LOGIN_SUCCESS,
        payload: data
    })
}