import { STOCKEVENT_CREATE_REQUEST, STOCKEVENT_CREATE_SUCCESS, STOCKEVENT_CREATE_FAIL, STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL, STOCKCOUNT_UPDATE_REQUEST, STOCKCOUNT_UPDATE_SUCCESS, STOCKCOUNT_UPDATE_FAIL } from '../constants/stockeventConstants';

function stockeventCreateReducer(state = { cartItem: [] }, action) {
    switch (action.type) {
        case STOCKEVENT_CREATE_REQUEST:
            return { loading: true };
        case STOCKEVENT_CREATE_SUCCESS:
            return { loading: false, stockevent: action.payload, stockeventSuccess: false };
        case STOCKEVENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function stockcountUpdateReducer(state = { cartItem: [] }, action) {
    switch (action.type) {
        case STOCKCOUNT_UPDATE_REQUEST:
            return { loading: true };
        case STOCKCOUNT_UPDATE_SUCCESS:
            return { loading: false, stockevent: action.payload, stockeventSuccess: false };
        case STOCKCOUNT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { stockeventCreateReducer, stockcountUpdateReducer }