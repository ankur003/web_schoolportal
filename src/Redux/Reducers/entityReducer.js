import * as Constants from '../Constants';

const initialState = {
    entityList: [],
    teacherList: [],
    studentList: [],
    pageCount: "",
    pageLimit: "",
    loader: false,
    noDataFound: false,
    created: false,
    userDetails: {},
    pic: "",
    isNavigate: false,
    classSectionList: [],
}


export default function entityReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_ALL_ENTITY:
            return {
                ...state,
                entityList: action.payload.data,
                pageCount: action.payload.page,
                pageLimit: action.payload.count,
                loader: true
            }
        case Constants.GET_STUDENT:
            return {
                ...state,
                studentList: action.payload.data,
                pageCount: action.payload.page,
                pageLimit: action.payload.count,
                loader: true
            }
        case Constants.GET_TEACHER:
            return {
                ...state,
                teacherList: action.payload.data,
                pageCount: action.payload.page,
                pageLimit: action.payload.count,
                loader: true
            }
        case Constants.NO_DATA_FOUND:
            return {
                ...state,
                noDataFound: true,
                loader: true
            }
        case Constants.CREATE_USER:
            return {
                ...state,
                created: action.payload
            }
        case Constants.LINK_CLASS_SECTION:
            return {
                ...state,
                created: action.payload
            }
        case Constants.GET_ALL_USER_DETAILS:
            return {
                ...state,
                loader: true,
                userDetails: action.payload,
            }
        case Constants.GET_ALL_USER_PROFILE:
            return {
                ...state,
                loader: true,
                pic: action.payload
            }
        case Constants.SET_TECHER_CLASS_SECTION:
            console.log("SET_TECHER_CLASS_SECTION", action.payload);
            return {
                ...state,
                classSectionList: action.payload
            }
        case Constants.RESET_STATE:
            return initialState;
        default:
            return state;
    }
}