import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL, OPEN_ORDER_LIST_REQUEST, OPEN_ORDER_LIST_SUCCESS, OPEN_ORDER_LIST_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from "../constants/orderConstants";


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
            // console.log("myOrders, ", myOrders);
            // console.log("userInfo.user.username, ", userInfo.user.username);

            return { loading: false, orders: myOrders };
        case MY_ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function openOrderListReducer(state = {
    orders: []
}, action) {
    switch (action.type) {
        case OPEN_ORDER_LIST_REQUEST:
            return { loading: true };
        case OPEN_ORDER_LIST_SUCCESS:
            const ordersPre = action.payload
            const orders = [...ordersPre]
            const userInfo = action.user
            const openOrders = orders.filter(order => order.isDelivered === false)
            // console.log("myOrders, ", myOrders);
            // console.log("userInfo.user.username, ", userInfo.user.username);

            return { loading: false, orders: orders };
        case OPEN_ORDER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

function orderDetailsReducer(state = {
    order: []
}, action) {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true };
        case ORDER_DETAILS_SUCCESS:
            console.log("action.payload in orderReducers, ", action.payload);
            const data = action.payload
            const orderItems = [data.cartItems]
            console.log("orderItems in orderReducers, ", orderItems)
            return { loading: false, orderData: data, orderItems: orderItems };
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
}

export { OrderCreateReducer, myOrderListReducer, openOrderListReducer, orderDetailsReducer }