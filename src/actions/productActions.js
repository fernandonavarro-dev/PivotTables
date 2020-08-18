import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_STOCK_REQUEST, PRODUCT_STOCK_SUCCESS, PRODUCT_STOCK_FAIL } from "../constants/productConstants";
import axios from 'axios';

const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {

    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const { data } = await axios.get("http://164.90.158.158/products");
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message })

    }

}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
        const { data } = await axios.get("http://164.90.158.158/products/" + productId);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message })

    }
}

const stockCountProduct = (plaza) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_STOCK_REQUEST, payload: (plaza) });
        const { userLogin: { userInfo } } = getState();
        const { data } = await axios.get("http://164.90.158.158/" + plaza + "-products/", {
            headers:
                { Authorization: 'Bearer ' + userInfo.jwt }
        }
        );
        dispatch({ type: PRODUCT_STOCK_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: PRODUCT_STOCK_FAIL, payload: error.message })

    }
}

export { listProducts, detailsProduct, stockCountProduct }
