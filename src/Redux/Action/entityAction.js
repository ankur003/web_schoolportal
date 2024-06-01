import * as Constants from '../Constants';
import axios from '../../api';
const basePathUrl = process.env.REACT_APP_BASE_PATH;

export const getAllUserDetails = (data, navigate) => (dispatch) => {
    console.log({ data });
    navigate("/ProfileDetailsPage")
    dispatch({ type: Constants.RESET_STATE })
    let url = `${basePathUrl}/sa/e0162288-2bc8-4d0a-af55-8a9e241aadb4/profile-pic`;

    axios.get(url)
        .then(response => {
            console.log({ response });
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_ALL_USER_PROFILE,
                    payload: response.data
                })
            }
            else if (response.status === 204) {
                dispatch({
                    type: Constants.NO_DATA_FOUND,
                    payload: response.data
                })
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const getEntities = (data) => (dispatch) => {
    dispatch({ type: Constants.RESET_STATE })
    let url = "";
    url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}`;
    console.log({ url })
    axios.get(url)
        .then(response => {
            console.log({ response });
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_ALL_ENTITY,
                    payload: response.data
                })
            }
            else if (response.status === 204) {
                dispatch({
                    type: Constants.NO_DATA_FOUND,
                    payload: response.data
                })
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const getTeacherEntities = (data) => (dispatch) => {
    dispatch({ type: Constants.RESET_STATE })
    let url = "";
    url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}&userType=${data?.userType}`;
    console.log({ url })
    axios.get(url)
        .then(response => {
            console.log({ response });
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_TEACHER,
                    payload: response.data
                })
            }
            else if (response.status === 204) {
                dispatch({
                    type: Constants.NO_DATA_FOUND,
                    payload: response.data
                })
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const getStudentEntities = (data) => (dispatch) => {
    dispatch({ type: Constants.RESET_STATE })
    let url = "";
    url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}&userType=${data?.userType}`;
    console.log({ url })
    axios.get(url)
        .then(response => {
            console.log({ response });
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_STUDENT,
                    payload: response.data
                })
            }
            else if (response.status === 204) {
                dispatch({
                    type: Constants.NO_DATA_FOUND,
                    payload: response.data
                })
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const createUser = (data, SetIsModal) => (dispatch) => {
    axios.post(`${basePathUrl}/sa/user`, data).then(response => {
        console.log({ response });
        if (response.status === 201) {
            SetIsModal(false);
            dispatch({
                type: Constants.CREATE_USER,
                payload: true,
            })
            let param = { page: 1, limit: 100, userType: data.userType }
            if (data.userType = "TEACHER") {
                dispatch(getTeacherEntities(param));
            }
            if (data.userType = "STUDENT") {
                dispatch(getStudentEntities(param));
            }

        }

    }).catch(error => {
        console.log(error);
    });
}