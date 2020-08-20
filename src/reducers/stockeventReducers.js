import { STOCKEVENT_CREATE_REQUEST, STOCKEVENT_CREATE_SUCCESS, STOCKEVENT_CREATE_FAIL, STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL } from '../constants/stockeventConstants';

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

export { stockeventCreateReducer }