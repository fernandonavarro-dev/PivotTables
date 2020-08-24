import { STOCKEVENT_CREATE_REQUEST, STOCKEVENT_CREATE_SUCCESS, STOCKEVENT_CREATE_FAIL, STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL, STOCKCOUNT_UPDATE_REQUEST, STOCKCOUNT_UPDATE_SUCCESS, STOCKCOUNT_UPDATE_FAIL, STOCKCOUNT_LIST_REQUEST, STOCKCOUNT_LIST_SUCCESS, STOCKCOUNT_LIST_FAIL } from '../constants/stockeventConstants';

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

function stockeventListReducer(
    state = {
        orders: [],
    },
    action
) {
    switch (action.type) {
        case STOCKEVENT_LIST_REQUEST:
            return { loading: true };
        case STOCKEVENT_LIST_SUCCESS:
            // const ordersPre = action.payload;
            // const orders = [...ordersPre];
            return { loading: false, stockevents: action.payload };
        case STOCKEVENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function stockCountListReducer(
    state = {
        plazasStocks: [],
    },
    action
) {
    switch (action.type) {
        case STOCKCOUNT_LIST_REQUEST:
            return { loading: true };
        case STOCKCOUNT_LIST_SUCCESS:
            // console.log("action.payload, ", action.payload);
            return { loading: false, plazasStocks: action.payload };
        case STOCKCOUNT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { stockeventCreateReducer, stockcountUpdateReducer, stockeventListReducer, stockCountListReducer }