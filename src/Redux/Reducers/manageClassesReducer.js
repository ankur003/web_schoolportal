import * as Constants from '../Constants';

const initialState = {
    classList: [],
    secList: [],
    linkList: [],
    loader: false
}

export default function manageClassesReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_CLASSES:
            return {
                ...state,
                classList: action.payload,
                loader:true
            }
        case Constants.GET_SECTION:
            return {
                ...state,
                secList: action.payload,
                loader:true
            }
        case Constants.GET_LINK:
            return {
                ...state,
                linkList: action.payload,
                loader:true
            }
        default:
            return state;
    }
}