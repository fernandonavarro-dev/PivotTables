import React, { useEffect, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { useDispatch, useSelector } from 'react-redux';
// import { listOrders } from '../actions/orderActions';
import { listStockevents } from '../actions/stockeventActions';

const PTableStockEvents = (props) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    // const orderList = useSelector(state => state.orderList);
    // const { loading, orders, error } = orderList;

    const stockeventList = useSelector(state => state.stockeventList);
    const { loading, stockevents, error } = stockeventList;

    const dispatch = useDispatch();

    const [initialState, setInitialState] = useState(props)

    useEffect(() => {
        if (userInfo && userInfo.user.isTop) {
            // dispatch(listOrders());
            dispatch(listStockevents());

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
                                <h3>Pivot Table Stock Events</h3>
                            </div>
                            {userInfo && userInfo.user.isTop && (


                                <PivotTableUI
                                    data={stockevents}
                                    onChange={s => setInitialState(s)}
                                    {...initialState}
                                />
                            )}

                        </>
                    )}
        </div>
    );

}

export default PTableStockEvents;