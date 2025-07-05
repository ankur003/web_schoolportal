import * as Constants from '../Constants';
import axios from '../../api';
const basePathUrl = process.env.REACT_APP_BASE_PATH;

export const fetchFees = (data) => (dispatch) => {
    const url = `${basePathUrl}/fees/master`;
    axios.get(url)
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_ALL_FEE,
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

export const AddOrEditFee = (data, setShowModal) => (dispatch) => {
    let url = ""
    if (data?.masterFeesUuid) {
        url = `${basePathUrl}/fees/master/${data.masterFeesUuid}`;
    }
    else {
        url = `${basePathUrl}/fees/master`;
    }
    const method = data.masterFeesUuid ? "put" : "post";
    axios({
        method,
        url,
        data
    })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                dispatch({
                    type: Constants.ADD_OR_EDIT_FEE,
                    payload: response.data
                });
                setShowModal(false);
                dispatch(fetchFees());
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const fetchPayments = () => (dispatch) => {
    const url = `${basePathUrl}/fees/payment`;
    axios.get(url)
        .then(response => {
            if (response.status === 200) {
                dispatch({
                    type: Constants.GET_ALL_PAYMENT,
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

export const addOrUpdatePayment = (data, setShowModal) => (dispatch) => {
    setShowModal(false)
    let url = `${basePathUrl}/fees/payment`;
    const method = data?.paymentUuid ? "put" : "post";
    if (data?.paymentUuid) {
        url = `${url}/${data.paymentUuid}`;
    }
    axios({
        method,
        url,
        data
    })
        .then(response => {
            if (response.status === 200 || response.status === 201) {
                dispatch({
                    type: Constants.ADD_OR_UPDATE_PAYMENT,
                    payload: response.data
                });
                dispatch(fetchPayments());
            }
        })
        .catch(error => {
            console.log(error);
        });

}
