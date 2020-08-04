import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS } from '../constants/orderConstants';

const createOrder = (cartItems, shipping, subtotal, taxPrice, totalNoShipping, total) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();

    const order = {
        // body: {
        user: userInfo.username,
        customerName: shipping.customerName,
        customerTel: shipping.customerTel,
        address: shipping.address,
        colony: shipping.colony,
        zip: shipping.zip,
        city: shipping.city,
        paymentMethod: shipping.paymentMethod,
        invoice: shipping.invoice,
        plaza: shipping.plaza,
        subtotal,
        shippingCost: shipping.shippingCost,
        tax: taxPrice,
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
        const { data: { data: newOrder } } = await axios
            .post("http://164.90.158.158/orders/",
                order, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.jwt
                }
            });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, error: error.message });
    }
}
//strapi ecommerce order
// fetch("http:...", {
//     method: 'POST',
//     headers: {
//         'Content-type': 'application/json'
//     },
//     body: JSON.stringify(data)
// })

export { createOrder }