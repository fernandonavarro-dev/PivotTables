import axios from 'axios';
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { STOCKEVENT_CREATE_REQUEST, STOCKEVENT_CREATE_SUCCESS, STOCKEVENT_CREATE_FAIL, STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL, STOCKCOUNT_UPDATE_REQUEST, STOCKCOUNT_UPDATE_SUCCESS, STOCKCOUNT_UPDATE_FAIL, STOCKCOUNT_LIST_FAIL, STOCKCOUNT_LIST_SUCCESS, STOCKCOUNT_LIST_REQUEST } from '../constants/stockeventConstants';

const createStockevent = (cartItem, order) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();

    const stockevent = {
        orderId: Number(order.id),
        orderSlug: order.plaza + "-" + order.customerName + "-" + order.total,
        type: "out",
        product: cartItem.name,
        qty: cartItem.qty,
        plaza: order.plaza
    }
    try {
        dispatch({ type: STOCKEVENT_CREATE_REQUEST, payload: stockevent });
        const { data: newStockevent } = await axios
            .post("http://164.90.158.158/stockevents",
                stockevent, {
                headers: {
                    Authorization: 'Bearer ' + userInfo.jwt
                }
            });
        dispatch({ type: STOCKEVENT_CREATE_SUCCESS, payload: newStockevent });
        console.log("newStockevent, ", newStockevent);
    } catch (error) {
        dispatch({ type: STOCKEVENT_CREATE_FAIL, error: error.message });
    }
}

const updateStockCount = (cartItem, order, productPlazaId, countInStock) => async (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();
    const stockCountUpdate = Number(countInStock) - Number(cartItem.qty)
    const stockCount = {
        // product: cartItem.name,
        countInStock: stockCountUpdate,
    }
    try {
        dispatch({ type: STOCKCOUNT_UPDATE_REQUEST, payload: stockCount });
        const { data } = await axios.put("http://164.90.158.158/" + order.plaza + "-products/" + productPlazaId,
            stockCount, {
            headers: {
                Authorization: 'Bearer ' + userInfo.jwt
            }
        });
        dispatch({ type: STOCKCOUNT_UPDATE_SUCCESS, payload: data });
        // console.log("newStockevent, ", newStockevent);
    } catch (error) {
        dispatch({ type: STOCKCOUNT_UPDATE_FAIL, error: error.message });
    }
}

const listStockevents = () => async (dispatch, getState) => {
    try {
        dispatch({ type: STOCKEVENT_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const { data: orders } = await axios.get("http://164.90.158.158/stockevents/"
            , {
                headers:
                    { Authorization: 'Bearer ' + userInfo.jwt }
            }
        );
        dispatch({ type: STOCKEVENT_LIST_SUCCESS, payload: orders, user: userInfo })
    } catch (error) {
        dispatch({ type: STOCKEVENT_LIST_FAIL, payload: error.message });
    }
}

const listStockCounts = () => (dispatch, getState) => {
    const { userLogin: { userInfo } } = getState();

    try {
        dispatch({ type: STOCKCOUNT_LIST_REQUEST });

        const plazas = ["cdmx", "cun", "mty", "playa", "pbl", "qro", "tulum"]
        function getStockCounts(array) {
            const plazasStocks = []
            array.map(async (item) => {
                let plazaStock = await axios.get("http://164.90.158.158/" + item + "-products"
                    , {
                        headers:
                            { Authorization: 'Bearer ' + userInfo.jwt }
                    }
                );
                plazasStocks.push(plazaStock.data)
            })
            return plazasStocks
        }
        const plazasStocks = getStockCounts(plazas)
        console.log("plazasStocks, ", plazasStocks);

        dispatch({ type: STOCKCOUNT_LIST_SUCCESS, payload: plazasStocks, user: userInfo })
    } catch (error) {
        dispatch({ type: STOCKCOUNT_LIST_FAIL, payload: error.message });
    }
}

export { createStockevent, updateStockCount, listStockevents, listStockCounts }

 // const { userLogin: { userInfo } } = getState();
    // const plazasIndex = ["cdmx", "cun"];
    // // const plazas = [];

    // // plazasIndex.map(plaza =>
    //   const plazas =  async dispatch => {
    //         // try {
    //         dispatch({ type: STOCKCOUNT_LIST_REQUEST });
    //         const { data } = await axios.get("http://164.90.158.158/" + "cdmx" + "-products"
    //             , {
    //                 headers:
    //                     { Authorization: 'Bearer ' + userInfo.jwt }
    //             }
    //         );
    //         plazas.push(data);
    //     }
    // // )
    // dispatch({ type: STOCKCOUNT_LIST_SUCCESS, payload: plazas, user: userInfo })
    // console.log("plazas, ", plazas);

    // // )

    // // } catch (error) {
    // //     dispatch({ type: STOCKCOUNT_LIST_FAIL, payload: error.message });
    // // }