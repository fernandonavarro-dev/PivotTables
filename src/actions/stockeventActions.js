import axios from 'axios';
// import { useDispatch } from 'react-redux';
import { STOCKEVENT_CREATE_REQUEST, STOCKEVENT_CREATE_SUCCESS, STOCKEVENT_CREATE_FAIL, STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL } from '../constants/stockeventConstants';

const createStockevent = (cartItem, order) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();

    const stockevent = {
        orderId: Number(order.id),
        orderSlug: order.plaza + "-" + order.customerName + "-" + order.total,
        type: "out",
        product: cartItem.name,
        qty: cartItem.qty,
        plaza: order.plaza
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