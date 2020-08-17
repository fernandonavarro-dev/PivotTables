import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  OPEN_ORDER_LIST_REQUEST,
  OPEN_ORDER_LIST_SUCCESS,
  OPEN_ORDER_LIST_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_FAIL,
  ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';
import Cookie from 'js-cookie';

function OrderCreateReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      Cookie.remove('cartItems');
      return { loading: false, order: action.payload, success: true };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderUpdateReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return { loading: true };
    case UPDATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload, success: true };
    case UPDATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function myOrderListReducer(
  state = {
    orders: [],
  },
  action
) {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true };
    case MY_ORDER_LIST_SUCCESS:
      const ordersPre = action.payload;
      const orders = [...ordersPre];
      const userInfo = action.user;
      const myOrders = orders.filter(
        (order) => order.sellerUsername === userInfo.user.username
      );
      const myActiveOrders = myOrders.filter(
        (order) => order.status !== 'cancelled'
      );
      // console.log("myOrders, ", myOrders);
      // console.log("userInfo.user.username, ", userInfo.user.username);

      return { loading: false, orders: myActiveOrders };
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function openOrderListReducer(
  state = {
    orders: [],
  },
  action
) {
  switch (action.type) {
    case OPEN_ORDER_LIST_REQUEST:
      return { loading: true };
    case OPEN_ORDER_LIST_SUCCESS:
      const ordersPre = action.payload;
      const orders = [...ordersPre];
      // const userInfo = action.user
      const openOrders = orders.filter((order) => order.isDelivered === false);
      // console.log("myOrders, ", myOrders);
      // console.log("userInfo.user.username, ", userInfo.user.username);

      return { loading: false, orders: openOrders };
    case OPEN_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderListReducer(
  state = {
    orders: [],
  },
  action
) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      const ordersPre = action.payload;
      const orders = [...ordersPre];
      const ordersArray = Array(orders);
      // const openOrders = orders.filter(order => order.isDelivered === false)
      console.log('orders in orderReducers, ', orders);
      console.log('typeof orders in orderReducers, ', typeof orders);
      console.log('typeof  ordersArray in orderReducers, ', typeof ordersArray);

      return { loading: false, orders: orders };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function orderDetailsReducer(
  state = { loading: true, order: { cartItems: [], data: {} } },
  action
) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export {
  OrderCreateReducer,
  myOrderListReducer,
  openOrderListReducer,
  orderDetailsReducer,
  orderUpdateReducer,
  orderListReducer,
};
