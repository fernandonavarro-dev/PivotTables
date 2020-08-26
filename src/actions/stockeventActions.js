import axios from 'axios';

import {
    STOCKEVENT_LIST_REQUEST, STOCKEVENT_LIST_SUCCESS, STOCKEVENT_LIST_FAIL,
    STOCKCOUNT_LIST_FAIL, STOCKCOUNT_LIST_SUCCESS, STOCKCOUNT_LIST_REQUEST
} from '../constants/stockeventConstants';

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
    try {
        dispatch({ type: STOCKCOUNT_LIST_REQUEST });
        const { userLogin: { userInfo } } = getState();
        const plazas = ["cdmx", "cun", "mty", "playa", "pbl", "qro", "tulum"]
        function getStockCounts(array) {
            const plazasStocks = []
            array.map(async (plaza) => {
                const { data: plazaStock } = await axios.get("http://164.90.158.158/" + plaza + "-products?_sort=name:ASC"
                    , {
                        headers:
                            { Authorization: 'Bearer ' + userInfo.jwt }
                    }
                );
                plazaStock.map(item => {
                    plazasStocks.push({ product: item.name, plaza, countInStock: item.countInStock })
                })
            })

            return plazasStocks
        }
        const plazasStocks = getStockCounts(plazas)

        dispatch({ type: STOCKCOUNT_LIST_SUCCESS, payload: plazasStocks, user: userInfo })
    } catch (error) {
        dispatch({ type: STOCKCOUNT_LIST_FAIL, payload: error.message });
    }
}

export {
    listStockevents, listStockCounts
}