import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch) => {
    try {
        const { data } = await axios.get("http://164.90.158.158/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data.id,
                name: data.name,
                image: data.imageURL,
                price: data.price,
                qtyCDMX: data.qtyCDMX,
                qty
            }
        })
    } catch (error) {

    }
}

export { addToCart };