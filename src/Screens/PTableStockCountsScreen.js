import React, { useEffect, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { useDispatch, useSelector } from 'react-redux';
import { listStockCounts } from '../actions/stockeventActions';
import Axios from 'axios';

const PTableStockCounts = (props) => {

    const [initialState, setInitialState] = useState(props)
    const [stockCounts, setStockCounts] = useState([])

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // const stockCountList = useSelector(state => state.stockCountList);
    // const { loading, stockCounts, error } = stockCountList;

    // const dispatch = useDispatch();

    const plazas = ["cdmx", "cun"]


    useEffect(() => {
        if (userInfo && userInfo.user.isTop) {
            // const getStockCounts = async (plazas) => {
            //     return plazas.map(async (plaza) => {
            //         return await Axios.get("http://164.90.158.158/" + plaza + "-products"
            //             , {
            //                 headers:
            //                     { Authorization: 'Bearer ' + userInfo.jwt }
            //             }
            //         );
            //     });
            // };

            const getStockCounts = (array) => {
                const promises = array.map(async (item) => {
                    return await Axios.get("http://164.90.158.158/" + item + "-products"
                        , {
                            headers:
                                { Authorization: 'Bearer ' + userInfo.jwt }
                        }
                    );
                });
                const responseArray = Promise.all(promises)
                return responseArray;
            }
            // const response = getStockCounts;
            // const responseCopy = { ...response }
            // const responseArray = [...Array(responseCopy)]
            console.log("getStockCounts(plazas), ", getStockCounts(plazas));
            // setStockCounts(getStockCounts(plazas))
            // dispatch(listStockCounts());
        }
        return () => {
            //
        };
    }, [userInfo, plazas]);

    return (
        <div>
            {/* {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : ( */}
            <>
                <div className="content content-margined">
                    <h3>Pivot Table Stock Counts</h3>
                </div>
                {userInfo && userInfo.user.isTop && (


                    <PivotTableUI
                        data={stockCounts}
                        onChange={s => setInitialState(s)}
                        {...initialState}
                    />
                )}

            </>
            {/* )} */}
        </div>
    );

}

export default PTableStockCounts;