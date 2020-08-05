import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';

function ProductScreen(props) {

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    // console.log("userInfo, ", userInfo);

    const dispatch = useDispatch();


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
        return () => {

        };
    }, [userInfo])

    console.log("orders, ", orders);

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
                                    <th>DELIVERED</th>
                                    <th>CREATED AT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => <tr key={order._id}>
                                    <td >{order.id}</td>
                                    <td >{order.sellerUsername}</td>
                                    <td>{order.plaza}</td>
                                    <td>${order.total}</td>
                                    <td>${order.commission}</td>
                                    <td>{order.isDelivered ? "Delivered" : "Processing"}</td>
                                    <td>{order.created_at}</td>
                                    {/* <td>
                                        <Link to={"/order/" + order.id}>DETAILS</Link>
                                    </td> */}
                                </tr>)}
                            </tbody>
                        </table>
            }
        </div>
    </div>

}

export default ProductScreen;

