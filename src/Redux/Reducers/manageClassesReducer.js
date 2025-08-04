import * as Constants from '../Constants';

const initialState = {
    classList: [],
    secList: [],
    linkList: [],
    subjectList: [],
    subjectListLinked: [],
    loader: false,
    AllClassEntities: {}
}

export default function manageClassesReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_CLASSES:
            return {
                ...state,
                classList: action.payload,
                loader: true
            }
        case Constants.GET_SECTION:
            return {
                ...state,
                secList: action.payload,
                loader: true
            }
        case Constants.GET_LINK:
            return {
                ...state,
                linkList: action.payload,
                loader: true
            }
        case Constants.GET_SUBJECT:
            return {
                ...state,
                subjectList: action.payload,
                loader: true
            }
        case Constants.GET_SUBJECT_LINKED:
            return {
                ...state,
                subjectListLinked: action.payload,
                loader: true
            }
        case Constants.GET_ALL_CLASS_ENTITIES:
            return {
                ...state,
                AllClassEntities: action.payload,
                loader: true
            }
        default:
            return state;
    }
}