import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL } from "../constants/orderConstants";


function OrderCreateReducer(state = {}, action) {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        case ORDER_CREATE_SUCCESS:
            return { loading: false, order: action.payload, success: true };
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state
    }
}

function myOrderListReducer(state = {
    orders: []
}, action) {
    switch (action.type) {
        case MY_ORDER_LIST_REQUEST:
            return { loading: true };
        case MY_ORDER_LIST_SUCCESS:
            const ordersPre = action.payload
            const orders = [...ordersPre]
            const userInfo = action.user
            const myOrders = orders.filter(order => order.sellerUsername === userInfo.user.username)
            console.log("myOrders, ", myOrders);
            console.log("userInfo.user.username, ", userInfo.user.username);

            return { loading: false, orders: myOrders };
        case MY_ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

export { OrderCreateReducer, myOrderListReducer }