import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from '../constants/orderConstants';

const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
        const { userLogin: { userInfo } } = getState();
        const { data: { data: newOrder } } = await axios
            .post("http://",
                order, {
                headers: {
                    Authorization: 'Bearer' + userInfo.token
                }
            });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, error: error.message });
    }
}

export { createOrder }