// import React from 'react';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_DELIVERY, CART_SAVE_SHIPPING } from '../constants/cartConstants'

function cartReducer(state = { cartItems: [], shipping: {}, }, action) {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.id === item.id);
            if (product) {
                return {
                    cartItems:
                        state.cartItems.map(x => x.id === product.id ? item : x)
                };
            }
            return { cartItems: [...state.cartItems, item] }
        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.id !== action.payload) }
        case CART_SAVE_SHIPPING:
            return { ...state, shipping: action.payload }
        case CART_SAVE_DELIVERY:
            return { ...state, delivery: action.payload }
        default:
            return state
    }
}

export { cartReducer };