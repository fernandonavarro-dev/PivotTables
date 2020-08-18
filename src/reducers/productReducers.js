import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_STOCK_REQUEST, PRODUCT_STOCK_SUCCESS, PRODUCT_STOCK_FAIL } from '../constants/productConstants'

function productListReducer(state = { products: [] }, action) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true };
        case PRODUCT_LIST_SUCCESS:
            const sortedArray = action.payload.sort(function (a, b) {
                var nameA = a.name;
                var nameB = b.name;
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
            return { loading: false, products: sortedArray }
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function productDetailsReducer(state = { product: {} }, action) {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

function productStockReducer(state = { productsStock: [] }, action) {
    switch (action.type) {
        case PRODUCT_STOCK_REQUEST:
            return { loading: true };
        case PRODUCT_STOCK_SUCCESS:
            // const productStockData = action.payload
            // const countInStock = productStockData.countInStock
            console.log("action.payload, ", action.payload);
            // console.log("productName in Reducer, ", productName);
            return { loading: false, productsStock: action.payload }
        case PRODUCT_STOCK_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}
export { productListReducer, productDetailsReducer, productStockReducer }