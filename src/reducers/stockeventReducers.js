import { STOCKEVENT_CREATE_REQUEST, STOCKEVENT_CREATE_SUCCESS, STOCKEVENT_CREATE_FAIL, STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL, STOCKEVENT_UPDATE_REQUEST, STOCKEVENT_UPDATE_SUCCESS, STOCKEVENT_UPDATE_FAIL } from '../constants/stockeventConstants';
// import Cookie from 'js-cookie';

function stockeventCreateReducer(state = { cartItem: [] }, action) {
    switch (action.type) {
        case STOCKEVENT_CREATE_REQUEST:
            return { loading: true };
        case STOCKEVENT_CREATE_SUCCESS:
            // Cookie.remove('cartItems');
            // Cookie.remove('plaza');
            return { loading: false, stockevent: action.payload, success: true };
        case STOCKEVENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { stockeventCreateReducer }