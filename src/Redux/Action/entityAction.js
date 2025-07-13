import * as Constants from '../Constants';
import axios from '../../api';
const basePathUrl = process.env.REACT_APP_BASE_PATH;

export const getAllUserDetails = (data) => (dispatch) => {
    let url = `${basePathUrl}/sa/user/${data}`;
    axios.get(url)
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_ALL_USER_DETAILS,
                    payload: response.data,
                })
                dispatch({
                    type: Constants.SET_TECHER_CLASS_SECTION,
                    payload: { className: response.data?.className, sectionName: response.data?.sectionName },
                });
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
    let url = "";
    if (data?.filter) {
        url = `${basePathUrl}/sa/user?fullName=${data?.values?.fullName}&username=${data?.values?.username}&userType=${data?.values?.userType}&className=${data?.values?.className}&sectionName=${data?.values?.sectionName}&page=1&limit=100`;
    }
    else if (data?.Studentfilter) {
        url = `${basePathUrl}/sa/user?userType=${data?.userType}&className=${data?.values?.className}&sectionName=${data?.values?.sectionName}&page=1&limit=100`;
    }
    else {
        url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}`;
        dispatch({ type: Constants.RESET_STATE })
    }
    axios.get(url)
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_ALL_ENTITY,
                    payload: response.data
                })
                if (data?.filter) {
                    data?.toast?.success("Submitted successfully");
                }
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
            toast.error("Something went wrong");
        });
}

export const getTeacherEntities = (data) => (dispatch) => {
    dispatch({ type: Constants.RESET_STATE })
    let url = "";
    url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}&userType=${data?.userType}`;
    axios.get(url)
        .then(response => {
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
    let url = "";
    if (data?.isNotAdmin === true) {
        url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}&className=${data?.className}&sectionName=${data?.sectionName}`;
    } else {
        url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}&userType=${data?.userType}`;
        dispatch({ type: Constants.RESET_STATE })
    }
    axios.get(url)
        .then(response => {
            if (response.status === 200) {
                if (data?.isNotAdmin === true) {
                    let studentList = response.data?.data?.filter((item) => {
                        return item.userType === "STUDENT";
                    });
                    dispatch({ type: Constants.GET_STUDENT, payload: { data: studentList } });

                }
                else {
                    dispatch({ type: Constants.GET_STUDENT, payload: { data: response.data?.data } });
                }
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

export const getParentEntities = (data) => (dispatch) => {
    let url = `${basePathUrl}/sa/user?page=${data?.page}&limit=${data?.limit}&userType=${data?.userType}`;
    axios.get(url)
        .then(response => {
            if (response.status === 200) {
                if (data?.isNotAdmin === true) {
                    let parentList = response.data?.data?.filter((item) => {
                        return item.userType === "PARENT";
                    });
                    dispatch({ type: Constants.GET_PARENT, payload: { data: parentList } });
                }
                else {
                    dispatch({ type: Constants.GET_STUDENT, payload: { data: response.data?.data } });
                }
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

export const getChildrenListByPar = (data) => async (dispatch) => {
    let url = `${basePathUrl}/student-parent-link/by-parent/${data}`;
    return axios.get(url)
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_CHILDS_LIST,
                    payload: response.data, // return actual children data
                });
                return response.data; // return data to caller
            }
            return null;
        })
        .catch(error => {
            console.log(error);
            return null;
        });
}

export const createUser = (data, SetIsModal, toast) => (dispatch) => {
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
            if (data.userType === "PARENT") {
                dispatch(getParentEntities(param));
            }
            toast.success("User created successfully");
        }

    }).catch(error => {
        console.log(error);
        toast.error("Something went wrong");
    });
}

export const linkClassSection = (data, SetIsModal, toast) => (dispatch) => {
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
            toast.success("Class and Section linked successfully");

        }

    }).catch(error => {
        console.log(error);
    });
}

export const updateUserDetails = (data, setState) => (dispatch) => {
    const payload = {
        address: {
            cBuildingName: data.cBuildingName,
            cCoutry: data.cCoutry,
            cDistrict: data.cDistrict,
            cFlatNo: data.cFlatNo,
            cFloorNo: data.cFloorNo,
            cHouseNo: data.cHouseNo,
            cPinCode: data.cPinCode,
            cState: data.cState,
            cTehsil: data.cTehsil,
            cVillage: data.cVillage,
            pBuildingName: data.pBuildingName,
            pCoutry: data.pCoutry,
            pDistrict: data.pDistrict,
            pFlatNo: data.pFlatNo,
            pFloorNo: data.pFloorNo,
            pHouseNo: data.pHouseNo,
            pPinCode: data.pPinCode,
            pState: data.pState,
            pTehsil: data.pTehsil,
            pVillage: data.pVillage,
        },
        fullName: data.fullName,
        dob: data.dob,
        doj: data.doj,
        phoneNo: data.phoneNo,
        userInfo: {
            bloodGroup: data.bloodGroup,
            fatherEmail: data.fatherEmailId,
            fatherPh: data.fatherMobileNumber,
            fatherName: data.fatherName,
            motherEmail: data.motherEmailId,
            motherPh: data.motherMobileNumber,
            motherName: data.motherName,
            motherOccupation: data.motherOccupation,
            fatherOccupation: data.fatherOccupation,
        },
    };
    axios.put(`${basePathUrl}/sa/user/${data.userId}`, payload)
        .then(response => {
            if (response.status === 200) {
                setState(true);
                dispatch(getAllUserDetails(data.userId, null));
            }
        })
        .catch(error => {
            console.error("Error updating user details:", error);
        });
}
