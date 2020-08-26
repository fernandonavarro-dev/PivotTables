import {
    STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL,
    STOCKCOUNT_LIST_REQUEST, STOCKCOUNT_LIST_SUCCESS, STOCKCOUNT_LIST_FAIL
} from '../constants/stockeventConstants';

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

export {
    // stockeventCreateReducer, stockcountUpdateReducer,
    stockeventListReducer, stockCountListReducer
}