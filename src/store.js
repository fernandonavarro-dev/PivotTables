import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer } from './reducers/productReducers';
import { userLoginReducer } from './reducers/userReducers';
import { orderListReducer } from './reducers/orderReducers';
import { stockCountListReducer, stockeventListReducer } from './reducers/stockeventReducers';

const cartItems = Cookie.getJSON("cartItems") || [];
const plaza = Cookie.getJSON("plaza") || null;
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
    cart: { cartItems, plaza, shipping: {} },
    userLogin: { userInfo },
};
const reducer = combineReducers({
    productList: productListReducer,
    userLogin: userLoginReducer,
    orderList: orderListReducer,
    stockeventList: stockeventListReducer,
    stockCountList: stockCountListReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;