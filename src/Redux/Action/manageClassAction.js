import * as Constants from '../Constants';
import axios from '../../api';
const basePathUrl = process.env.REACT_APP_BASE_PATH;

export const getClasses = () => (dispatch) => {
    axios.get(`${basePathUrl}/sa/master-class`)
        .then(response => {
            dispatch({
                type: Constants.GET_CLASSES,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });

    axios.get(`${basePathUrl}/sa/class-section-link`)
        .then(response => {
            dispatch({
                type: Constants.GET_LINK,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });

    axios.get(`${basePathUrl}/sa/master-section`)
        .then(response => {
            dispatch({
                type: Constants.GET_SECTION,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export const createClassAndSection = (data, type) => (dispatch) => {
    let value = {};
    if (type === "CreateClass") {
        value = { className: data.formState.className };
    }
    else if (type === "CreateSection") {
        value = { sectionName: data.formState.sectionName }
    }
    else {
        value = { classUuid: data.formState.className, sectionUuids: data.sectionID };
    }
    console.log({ value })
    axios.post(type === "CreateClass" ? `${basePathUrl}/sa/master-class` : type === "CreateSection" ? `${basePathUrl}/sa/master-section` : `${basePathUrl}/sa/class-section-link`, value)
        .then(response => {
            console.log({response});
            if(response.status == 201) {
                
            }
            if(response.status == 304) {
                
            }
            dispatch(getClasses());
        })
        .catch(error => {
            console.log(error);
        });
};