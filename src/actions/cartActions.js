import axios from 'axios';
import Cookie from 'js-cookie';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_DELIVERY } from '../constants/cartConstants';

const addToCart = (productId, qty, plazaStock) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get("http://164.90.158.158/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                id: data.id,
                name: data.name,
                image: data.imageURL,
                price: data.price,
                qtyPlaza: plazaStock,
                qty
            }
        });

        const { cart: { cartItems } } = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    }
    catch (error) {

    }
}

const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });

    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}

const saveShipping = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data })
}

const saveDelivery = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_DELIVERY, payload: data })
}

export { addToCart, removeFromCart, saveShipping, saveDelivery };