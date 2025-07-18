
import * as Constants from '../Constants';

const initialState = {
    oneTimeList: [],
    monthlyList: [],
    paymentList: [],
    loader: false,
    noDataFound: false,
};


export default function feeManageReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.GET_ALL_FEE:
            return {
                ...state,
                feeList: action.payload,
                loader: true,
                noDataFound: false
            };
        case Constants.GET_ONE_TIME_FEE:
            return {
                ...state,
                oneTimeList: action.payload,
                loader: true,
                noDataFound: false
            };
        case Constants.GET_MONTHLY_FEE:
            return {
                ...state,
                monthlyList: action.payload,
                loader: true,
                noDataFound: false
            };
        case Constants.GET_ALL_PAYMENT:
            return {
                ...state,
                allFeeList: action.payload,
                loader: true,
                noDataFound: false
            };
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