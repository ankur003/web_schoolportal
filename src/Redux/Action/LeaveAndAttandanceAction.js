import * as Constants from '../Constants';
import axios from '../../api';
const basePathUrl = process.env.REACT_APP_BASE_PATH;

export const getLeaveRequestDetails = (data) => (dispatch) => {
    let url = "";
    if (data && data.userId) {
        url = `${basePathUrl}/sa/attendance?userId=${data.userId}`;
    }
    else {
        url = `${basePathUrl}/sa/attendance`;
    }
    axios.get(url)
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_LEAVE_REQUESTS,
                    payload: response.data,
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
};

export const leaveRequestApply = (data, SetIsModal) => (dispatch) => {
    let url = `${basePathUrl}/t/attendance?status=${data.leaveType}&date=${data.date}`;
    axios.post(url, data)
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: Constants.CREATED_SUCCESSFULLY,
                    payload: response.data,
                });
                SetIsModal(false);
                dispatch(getLeaveRequestDetails());
            }
            else if (response.status === 204) {
                dispatch({
                    type: Constants.SOMETHING_WENT_WRONG,
                    payload: response.data
                })
            }
        })
        .catch(error => {
            console.log(error);
        });
};


export const leaveRequestAction = (data) => (dispatch) => {
    let url = `${basePathUrl}/sa/attendance?userId=${data.userUuid}&status=${data.action}&date=${data.date}`;
    axios.put(url)
        .then(response => {
            if (response.status === 200) {
                dispatch(getLeaveRequestDetails());
            }
        })
        .catch(error => {
            console.log(error);
        });
};