import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { listMyOrders, updateOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProductScreen(props) {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const [status, setStatus] = useState('processing')

    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/");
    }

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

    useEffect(() => {
        if (userInfo) {
            // console.log(userInfo.name)
            // setEmail(userInfo.email);
            // setName(userInfo.name);
            // setPassword(userInfo.password);
        }
        dispatch(listMyOrders());
        // setAllOrders()
        return () => {

        };
    }, [userInfo])

    const cancelOrderHandler = (e) => {
        setStatus("cancelled")
        console.log("status, ", status);
        dispatch(updateOrder(status))
    }



    return <div className="profile">
        <div className="profile-info">
            <div className="form">
                <ul className="form-container">
                    <li>
                        <h2>User Profile</h2>
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name: {userInfo.user.name}
                        </label>
                    </li>
                    <li>
                        <label htmlFor="username">
                            Username: {userInfo.user.username}
                        </label>
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email: {userInfo.user.email}
                        </label>
                    </li>
                    <li>
                        <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
        <div className="profile-orders content-margined">
            {
                loadingOrders ? <div>Loading...</div> :
                    errorOrders ? <div>{errorOrders} </div> :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ORDER ID</th>
                                    <th>SELLER</th>
                                    <th>PLAZA</th>
                                    <th>TOTAL</th>
                                    <th>COMMISSION</th>
                                    <th>STATUS</th>
                                    <th>CREATED AT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order =>
                                    <tr key={order.id}>
                                        <td >{order.id}</td>
                                        <td >{order.sellerUsername}</td>
                                        <td>{order.plaza}</td>
                                        <td>${order.total}</td>
                                        <td>${order.commission}</td>
                                        <td>{order.status}</td>
                                        <td>{order.created_at}</td>
                                        <button
                                            type="button"
                                            onClick={() => cancelOrderHandler(order.id)}
                                            className="button"
                                            style={{ marginLeft: '1.5rem', marginTop: '1rem' }}
                                        >
                                            Cancel
                                        </button>
                                        {/* <td>
                                        <Link to={"/order/" + order.id}>DETAILS</Link>
                                    </td> */}
                                    </tr>)}
                            </tbody>
                        </table>
            }
        </div>
        {/* <div>
            <button type="button" onClick={fetchMyOrders} className="button secondary full-width">Get My Orders</button>
        </div> */}
    </div>

}

export default ProductScreen;


 // const ordersData = { ...orders }
    // const ordersArray = Object.entries(self.ordersData);

    // function findInObject(my_object, my_criteria) {

    //     return my_object.filter(function (obj) {
    //         return Object.keys(my_criteria).every(function (c) {
    //             return obj[c] == my_criteria[c];
    //         });
    //     });

    // }

    // const myOrders = [];
    // const needle = userData.userInfo.user.username; // what to look for

    // ordersArray.forEach(function (e) {
    //     myOrders = myOrders.concat(e.Categories.filter(function (c) {
    //         return (c['sellerUsername'] === needle);
    //     }));
    // });


    // const myOrders = findInObject(JSON.parse(ordersArray), { 'sellerUsername': userData.userInfo.user.username });

    // const myOrders = JSON.parse(ordersArray).filter(({ sellerUsername }) => sellerUsername === userData.userInfo.user.username);

    // const myOrders = JSON.parse(ordersArray).filter(function (entry) {
    //     return entry['sellerUsername'] === userData.userInfo.user.username;
    // });

    // console.log("userData.userInfo.user.username ", userData.userInfo.user.username);
    // console.log("orders , ", orders);
    // console.log("typeof orders , ", typeof orders);
    // console.log("myOrders , ", myOrders);
    // console.log("typeof myOrders , ", typeof myOrders);


    // const [ordersState, setOrdersState] = useState([])

// const myOrders = [ordersState].filter(x => x.sellerUsername === userData.userInfo.user.username);

    // const myOrdersData = ordersData.filter(order => order.sellerUsername === userData.userInfo.user.username);

    // const order11 = ordersData[12];
    // console.log("typeof orderArray ", typeof orderArray);

    // const [allOrders, setAllOrders] = useState([])
    // const { userInfo.user.sellerUsername } = userLogin;
    // console.log("userInfo, ", userInfo);

      // const fetchMyOrders = () => {
    //     const ordersArray = Object.entries(ordersData);
    //     setOrdersState(ordersArray);

    // }
