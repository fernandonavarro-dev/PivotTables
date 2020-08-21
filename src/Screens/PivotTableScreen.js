import React, { useEffect, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
// import { listStockevents } from '../actions/stockeventActions';

const PivotTableScreen = (props) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    // const stockeventList = useSelector(state => state.stockeventList);
    // const { stockevents } = stockeventList;

    const dispatch = useDispatch();

    const [initialState, setInitialState] = useState(props)

    // const mergeArrays = (a1, a2) =>
    //     a1.map(itm => ({
    //         ...a2.find((item) => (item.orderSlug === itm.orderSlug) && item),
    //         ...itm
    //     }));

    // const mergeArrays = (a1, a2) =>
    //     a1.map((item, i) => Object.assign({}, item, a2[i]));

    // const mergeArrays = () => {
    //     let merged = [];
    //     let a1 = stockevents
    //     let a2 = orders

    //     for (let i = 0; i < a1.length; i++) {
    //         merged.push({
    //             ...a1[i],
    //             ...(a2.find((itmInner) => itmInner.orderSlug === a1[i].orderSlug))
    //         }
    //         );
    //     }
    //     return merged
    // }

    // console.log("arr3, ", arr3);

    useEffect(() => {
        if (userInfo && userInfo.user.isTop) {
            dispatch(listOrders());
            // dispatch(listStockevents());

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
                                <h3>Pivot Table Orders</h3>
                            </div>
                            {userInfo && userInfo.user.isTop && (


                                <PivotTableUI
                                    data={orders}
                                    onChange={s => setInitialState(s)}
                                    {...initialState}
                                />
                            )}

                        </>
                    )}
        </div>
    );

}

export default PivotTableScreen;

// class PivotTableScreen extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = props;
//     }

// async componentDidMount(getState) {
//     // const { userLogin: { userInfo } } = getState();
//     const userLogin = useSelector(state => state.userLogin);
//     const { userInfo } = userLogin;
//     
//     const ordersData = fetchedOrders.data;
//     this.setState = ({ ordersData });
//     console.log("ordersData, ", ordersData);

// }

//     render() {
//         return (
//             <PivotTableUI
//                 data={data}
//                 onChange={s => this.setState(s)}
//                 {...this.state}
//             />
//         );
//     }
// }
