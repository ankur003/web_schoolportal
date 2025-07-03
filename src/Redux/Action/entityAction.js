import * as Constants from '../Constants';
import axios from '../../api';
const basePathUrl = process.env.REACT_APP_BASE_PATH;

export const getAllUserDetails = (data) => (dispatch) => {
    let url = `${basePathUrl}/sa/user/${data}`;

    axios.get(url)
        .then(response => {
            console.log({ response });
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_ALL_USER_DETAILS,
                    payload: response.data,
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
    axios.get(url)
        .then(response => {
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
    console.log({ data });
    dispatch({ type: Constants.RESET_STATE })
    let url = "";
    if (data?.isNotAdmin === true) {
        url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}&className=${data?.className}&sectionName=${data?.sectionName}`;
    } else {
        url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}&userType=${data?.userType}`;
    }
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
        if (response.status === 201) {
            SetIsModal(false);
            dispatch({
                type: Constants.CREATE_USER,
                payload: true,
            })
            let param = { page: 1, limit: 100, userType: data.userType }
            if (data.userType === "TEACHER") {
                dispatch(getTeacherEntities(param));
            }
            if (data.userType === "STUDENT") {
                dispatch(getStudentEntities(param));
            }

        }

    }).catch(error => {
        console.log(error);
    });
}

export const linkClassSection = (data, SetIsModal) => (dispatch) => {
    let dataBody = {
        classUuid: data?.className,
        sectionUuid: data?.sections
    };
    axios.post(`${basePathUrl}/sa/s/${data?.userId}/class-section-assign`, dataBody).then(response => {
        if (response.status === 201) {
            SetIsModal(false);
            dispatch({
                type: Constants.LINK_CLASS_SECTION,
                payload: true,
            })
            let param = { page: 1, limit: 100, userType: data?.userType }
            if (data.userType === "TEACHER") {
                dispatch(getTeacherEntities(param));
            }
            if (data.userType === "STUDENT") {
                dispatch(getStudentEntities(param));
            }

        }

    }).catch(error => {
        console.log(error);
    });
}