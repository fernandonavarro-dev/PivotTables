import axios from 'axios';
import { MY_ORDER_LIST_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, OPEN_ORDER_LIST_FAIL, OPEN_ORDER_LIST_REQUEST, OPEN_ORDER_LIST_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from '../constants/orderConstants';

const createOrder = (cartItems, shipping, subtotal, commission, taxPrice, totalNoShipping, total) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();

    const order = {
        // body: {
        sellerUsername: userInfo.user.username,
        customerName: shipping.customerName,
        customerTel: shipping.customerTel,
        address: shipping.address,
        colony: shipping.colony,
        zip: shipping.zip,
        city: shipping.city,
        paymentMethod: shipping.paymentMethod,
        invoicePct: shipping.invoice * 100,
        plaza: shipping.plaza,
        subtotal,
        commission,
        shippingCost: shipping.shippingCost,
        invoiceTax: taxPrice,
        totalNoShipping,
        total,
        isDelivered: false,
        deliveryPerson: shipping.deliveryPerson,
        cartItems,
        sellerComments: shipping.sellerComments,
        coordinatorNotes: shipping.coordinatorNotes
        // }
    }
    try {
        dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
        const { data: newOrder } = await axios
            .post("http://164.90.158.158/orders/",
                order, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.jwt
                }
            });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
        // console.log("newOrder, ", newOrder);
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, error: error.message });
    }

}

const updateOrder = (orderId, isDelivered, deliveryDate, deliveryPerson, notes) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();

    const order = {
        isDelivered,
        deliveryDate,
        deliveryPerson,
        coordinatorNotes: notes
    }
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST, payload: order });
        const { data: orderUpdate } = await axios
            .put("http://164.90.158.158/orders/" + orderId,
                order, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.jwt
                }
            });
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: orderUpdate });

    } catch (error) {
        dispatch({ type: UPDATE_ORDER_FAIL, error: error.message });
    }
}

const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_ORDER_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data: orders } = await axios.get("http://164.90.158.158/orders/"
            , {
                headers:
                    { Authorization: 'Bearer ' + userInfo.jwt }
            }
        );
        dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: orders, user: userInfo })
    } catch (error) {
        dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
    }
}

const listOpenOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: OPEN_ORDER_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data: orders } = await axios.get("http://164.90.158.158/orders/"
            , {
                headers:
                    { Authorization: 'Bearer ' + userInfo.jwt }
            }
        );
        dispatch({ type: OPEN_ORDER_LIST_SUCCESS, payload: orders, user: userInfo })
    } catch (error) {
        dispatch({ type: OPEN_ORDER_LIST_FAIL, payload: error.message });
    }
}

const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get("http://164.90.158.158/orders/" + orderId, {
            headers:
                { Authorization: 'Bearer ' + userInfo.jwt }
        }
        );
        // console.log("order inside orderActions," order);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data, user: userInfo })
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
    }
}

export { createOrder, listMyOrders, listOpenOrders, detailsOrder, updateOrder }

// const { data: { data: newOrder } } = await axios


//strapi ecommerce order
// fetch("http:...", {
//     method: 'POST',
//     headers: {
//         'Content-type': 'application/json'
//     },
//     body: JSON.stringify(data)
// })
