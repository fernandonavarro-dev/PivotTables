import React, { useEffect, useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
// import { jsonToCSV } from 'react-papaparse'
// import { cloneDeep } from 'lodash'

const PivotTableScreen = (props) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [initialState, setInitialState] = useState(props)

    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrders());
        return () => {
            //
        };
    }, [dispatch]);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                        <>
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

// class PivotTableScreen extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = props;
//     }

// async componentDidMount(getState) {
//     // const { userLogin: { userInfo } } = getState();
//     const userLogin = useSelector(state => state.userLogin);
//     const { userInfo } = userLogin;
//     const fetchedOrders = await axios.get("http://164.90.158.158/orders/"
//         // const { data: orders } = await axios.get("http://164.90.158.158/orders/"
//         , {
//             headers:
//                 { Authorization: 'Bearer ' + userInfo.jwt }
//         }
//     );
//     // console.log("fetchedOrders, ", fetchedOrders);

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

export default PivotTableScreen;

// const orderDispatch = () => {
//     const userLogin = useSelector(state => state.userLogin);
//     const { userInfo } = userLogin;

//     const openOrderList = useSelector(state => state.openOrderList);
//     // const { loading, orders, error } = openOrderList;
//     const { loading: loadingOrders, orders, error: errorOrders } = openOrderList;

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(listOpenOrders());
//         return () => {
//             //
//         };
//     }, []);

//     return data
// }

// export default connect(orderDispatch)(PivotTableScreen);