import axios from 'axios';
// import { useDispatch } from 'react-redux';
import { STOCKEVENT_CREATE_REQUEST, STOCKEVENT_CREATE_SUCCESS, STOCKEVENT_CREATE_FAIL, STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL, STOCKCOUNT_UPDATE_REQUEST, STOCKCOUNT_UPDATE_SUCCESS, STOCKCOUNT_UPDATE_FAIL, STOCKCOUNT_LIST_FAIL, STOCKCOUNT_LIST_SUCCESS, STOCKCOUNT_LIST_REQUEST } from '../constants/stockeventConstants';

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

const updateStockCount = (cartItem, order, productPlazaId, countInStock) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    const stockCountUpdate = Number(countInStock) - Number(cartItem.qty)
    const stockCount = {
        // product: cartItem.name,
        countInStock: stockCountUpdate,
    }
    try {
        dispatch({ type: STOCKCOUNT_UPDATE_REQUEST, payload: stockCount });
        const { data } = await axios.put("http://164.90.158.158/" + order.plaza + "-products/" + productPlazaId,
            stockCount, {
            headers: {
                Authorization: 'Bearer ' + userInfo.jwt
            }
        });
        dispatch({ type: STOCKCOUNT_UPDATE_SUCCESS, payload: data });
        // console.log("newStockevent, ", newStockevent);
    } catch (error) {
        dispatch({ type: STOCKCOUNT_UPDATE_FAIL, error: error.message });
    }
}

const listStockevents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STOCKEVENT_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data: orders } = await axios.get("http://164.90.158.158/stockevents/"
            , {
                headers:
                    { Authorization: 'Bearer ' + userInfo.jwt }
            }
        );
        dispatch({ type: STOCKEVENT_LIST_SUCCESS, payload: orders, user: userInfo })
    } catch (error) {
        dispatch({ type: STOCKEVENT_LIST_FAIL, payload: error.message });
    }
}

// const listStockCounts = () => async (dispatch, getState) => {
//     try {
//         dispatch({ type: STOCKCOUNT_LIST_REQUEST });
//         const { userLogin: { userInfo } } = getState();
//         const { data: stockCounts } = await axios.get("http://164.90.158.158/stockevents/"
//             , {
//                 headers:
//                     { Authorization: 'Bearer ' + userInfo.jwt }
//             }
//         );
//         dispatch({ type: STOCKCOUNT_LIST_SUCCESS, payload: stockCounts, user: userInfo })
//     } catch (error) {
//         dispatch({ type: STOCKCOUNT_LIST_FAIL, payload: error.message });
//     }
// }

export { createStockevent, updateStockCount, listStockevents, /*listStockCounts*/ }