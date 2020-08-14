import React, { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listOpenOrders, listOrders } from '../actions/orderActions';
import { jsonToCSV } from 'react-papaparse'
import { cloneDeep } from 'lodash'

// see documentation for supported input formats
const data = [['attribute', 'attribute2'], ['value1', 'value2']];

const PivotTableScreen = (props) => {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [initialState, setInitialState] = useState(props)
    // const [data, setData] = useState([])

    const orderList = useSelector(state => state.orderList);
    // const { loading, orders, error } = orderList;
    const { loading: loadingOrders, orders, error: errorOrders } = orderList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrders());
        return () => {
            //
        };
    }, []);

    const ordersData = [{ ...orders }]
    const ordersClone = { ...orders }
    // delete ordersClone.cartItems
    const ordersString = JSON.stringify(ordersData)
    const ordersCSV = jsonToCSV(ordersString)

    console.log("ordersClone in PivotTableScreen, ", ordersClone);
    console.log("ordersCSV in PivotTableScreen, ", ordersCSV);
    console.log("ordersString in PivotTableScreen, ", ordersString);


    return (
        <div>
            {userInfo && userInfo.user.isTop && (

                <PivotTableUI
                    data={ordersData}
                    onChange={s => setInitialState(s)}
                    {...initialState}
                />
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