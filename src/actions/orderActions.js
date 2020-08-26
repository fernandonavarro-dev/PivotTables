import axios from 'axios';
import {
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL
} from '../constants/orderConstants';

const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data: orders } = await axios.get("http://164.90.158.158/orders?_limit=1000"
            , {
                headers:
                    { Authorization: 'Bearer ' + userInfo.jwt }
            }
        );
        dispatch({ type: ORDER_LIST_SUCCESS, payload: orders, user: userInfo })
    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
    }
}

export {
    listOrders
}
