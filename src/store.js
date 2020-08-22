import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { cartReducer } from './reducers/cartReducers';
import { productDetailsReducer, productListReducer, productStockReducer } from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducers';
import { myOrderListReducer, openOrderListReducer, OrderCreateReducer, orderDetailsReducer, orderListReducer } from './reducers/orderReducers';
import { stockCountListReducer, stockcountUpdateReducer, stockeventCreateReducer, stockeventListReducer } from './reducers/stockeventReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const plaza = Cookie.getJSON("plaza") || null;
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
    cart: { cartItems, plaza, shipping: {} },
    userLogin: { userInfo },
    // processingOrder: { orderItems: [], shipping: {}, delivery: {} }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productStockCount: productStockReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    orderCreate: OrderCreateReducer,
    myOrderList: myOrderListReducer,
    openOrderList: openOrderListReducer,
    orderList: orderListReducer,
    orderDetails: orderDetailsReducer,
    stockeventCreate: stockeventCreateReducer,
    stockcountUpdate: stockcountUpdateReducer,
    stockeventList: stockeventListReducer,
    stockCountList: stockCountListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;