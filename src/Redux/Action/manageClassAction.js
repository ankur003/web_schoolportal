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

export const createClassAndSection = (data, type, toaster) => (dispatch) => {
    let value = {};
    if (type === "CreateClass") {
        value = { className: data?.className };
    }
    else if (type === "CreateSection") {
        value = { sectionName: data?.sectionName }
    }
    else {
        value = { classUuid: data.classUuid, sectionUuids: data.sectionUuids };
    }
    axios.post(type === "CreateClass" ? `${basePathUrl}/sa/master-class` : type === "CreateSection" ? `${basePathUrl}/sa/master-section` : `${basePathUrl}/sa/class-section-link`, value)
        .then(response => {
            if (response.status == 201) {
                toaster.success("Created Successfully!")
            }
            if (response.status == 304) {
                toaster.info("Nothing changed!")
            }
            dispatch(getClasses());
        })
        .catch(error => {
            console.log(error);
        });
};

export const getSubject = () => (dispatch) => {
    axios.get(`${basePathUrl}/subjects/list`)
        .then(response => {
            dispatch({
                type: Constants.GET_SUBJECT,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export const getSubjectLinked = () => (dispatch) => {
    axios.get(`${basePathUrl}/subjects`)
        .then(response => {
            dispatch({
                type: Constants.GET_SUBJECT_LINKED,
                payload: response.data
            })
        })
        .catch(error => {
            console.log(error);
        });
}

export const createSubjectAndLinked = (data, type, toast) => (dispatch) => {
    console.log({ data })
    if (type === "createSubject") {
        let url = `${basePathUrl}/subjects`
        const method = "put";
        axios({ method, url, data: data, headers: { "Content-Type": "application/json" } })
            .then(response => {
                console.log({ response });
                if (response.status == 200) {
                    toast.success("Created Successfully!")
                    dispatch(getSubject());
                }
                if (response.status == 304) {
                    toast.info("Nothing changed!")
                }
                dispatch(getClasses());
            })
            .catch(error => {
                toast.error("Some Thing Went Wrong",error)
            });
    }
    else if (type === "subjectLinkedClass" || type === "newSubjectLinkage") {
        let url = `${basePathUrl}/subjects/link`
        const method = "put";
        axios({ method, url, data: JSON.stringify(data), headers: { "Content-Type": "application/json" } })
            .then(response => {
                if (response.status == 200) {
                    toast.success("Linked Successfully !")
                    dispatch(getSubjectLinked());
                }
                if (response.status == 304) {
                    toast.info("Nothing changed!")
                }
                dispatch(getClasses());
            })
            .catch(error => {
                toast.error("Some Thing Went Wrong", error)
            });
    };
}