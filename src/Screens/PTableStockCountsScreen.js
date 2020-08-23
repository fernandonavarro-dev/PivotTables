import React, { useEffect, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { useDispatch, useSelector } from 'react-redux';
import { listStockCounts } from '../actions/stockeventActions';
import Axios from 'axios';

const PTableStockCounts = (props) => {

    const [initialState, setInitialState] = useState(props);
    // const [stockCounts, setStockCounts] = useState([]);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const stockCountList = useSelector(state => state.stockCountList);
    const { loading, plazasStocks, error } = stockCountList;

    const dispatch = useDispatch();

    console.log("plazasStocks in PTableScreen, ", plazasStocks);

    // const plazas = ["cdmx", "cun", "mty", "playa", "pbl", "qro", "tulum"]

    useEffect(() => {
        if (userInfo && userInfo.user.isTop) {
            dispatch(listStockCounts());

            // const plazaStocks = []
            // function getStockCounts(array) {
            //     array.map(async (item) => {
            //         let plazaStock = await Axios.get("http://164.90.158.158/" + item + "-products"
            //             , {
            //                 headers:
            //                     { Authorization: 'Bearer ' + userInfo.jwt }
            //             }
            //         );
            //         plazaStocks.push(plazaStock.data)
            //     })
            // }
            // getStockCounts(plazas)
            // //setStockCounts(plazaStocks)
        }
        return () => {
            //
        };
    }, [dispatch, userInfo]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                        <>
                            <div className="content content-margined">
                                <h3>Pivot Table Stock Counts</h3>
                            </div>
                            {userInfo && userInfo.user.isTop && (


                                <PivotTableUI
                                    data={plazasStocks}
                                    onChange={s => setInitialState(s)}
                                    {...initialState}
                                />
                            )}

                        </>
                    )}
        </div>
    );

}

export default PTableStockCounts;

// console.log("stockCounts, ", stockCounts);

            // const getStockCounts = (array) => {
            //     const promises = array.map(async (item) => {
            //         return await Axios.get("http://164.90.158.158/" + item + "-products"
            //             , {
            //                 headers:
            //                     { Authorization: 'Bearer ' + userInfo.jwt }
            //             }
            //         );
            //     });
            //     const responseArray = Promise.all(promises)
            //     return responseArray;
            // }