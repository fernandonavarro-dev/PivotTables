import axios from 'axios';
// import { useDispatch } from 'react-redux';
import { STOCKEVENT_CREATE_REQUEST, STOCKEVENT_CREATE_SUCCESS, STOCKEVENT_CREATE_FAIL, STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL, STOCKEVENT_UPDATE_REQUEST, STOCKEVENT_UPDATE_SUCCESS, STOCKEVENT_UPDATE_FAIL } from '../constants/stockeventConstants';

const createStockevent = (cartItem, shipping, total) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();

    const stockevent = {
        orderId: shipping.plaza + "-" + shipping.customerName + "-" + total,
        type: "remove",
        product: cartItem.name,
        qty: cartItem.qty,
        status: "processing",
        plaza: shipping.plaza
    }
    try {
        dispatch({ type: STOCKEVENT_CREATE_REQUEST, payload: stockevent });
        const { data: newStockevent } = await axios
            .post("http://164.90.158.158/stockevents",
                stockevent, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.jwt
                }
            });
        dispatch({ type: STOCKEVENT_CREATE_SUCCESS, payload: newStockevent });
        console.log("newStockevent, ", newStockevent);
    } catch (error) {
        dispatch({ type: STOCKEVENT_CREATE_FAIL, error: error.message });
    }
}

export { createStockevent }