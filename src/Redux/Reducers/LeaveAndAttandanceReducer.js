
import * as Constants from '../Constants';

const initialState = {
    leaveRequest: [],
    attandanceList: [],
    loader: false,
    noDataFound: false,
}


export default function leaveRequestReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_LEAVE_REQUESTS:
            console.log("Leave Request Data:", action.payload);
            return {
                ...state,
                leaveRequest: action.payload,
                loader: true
            };
        case Constants.CREATED_SUCCESSFULLY:
            return {
                ...state,
                loader: true
            }
        case Constants.GET_ALL_ATTANDANCE:
            return {
                ...state,
                attandanceList: payload.data,
                loader: true
            }
        case Constants.NO_DATA_FOUND:
            return {
                ...state,
                noDataFound: true,
                loader: true
            }
        case Constants.RESET_STATE:
            return initialState;
        default:
            return state;
    }
}