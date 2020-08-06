import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOpenOrders } from '../actions/orderActions';

function OrdersScreen() {
    const openOrderList = useSelector(state => state.openOrderList);
    // const { loading, orders, error } = openOrderList;
    const {
        loading: loadingOrders,
        orders,
        error: errorOrders } = openOrderList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOpenOrders());
        return () => {
            //
        };
    }, []);

    return (
        <div className="content content-margined">

            <div className="order-header">
                <h3>Orders</h3>
            </div>
            <div className="order-list">
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
                                    {orders.map(order =>
                                        <tr key={order.id}>
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
    )
}
export default OrdersScreen;

//   const orderDelete = useSelector(state => state.orderDelete);
//   const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

//   const deleteHandler = (order) => {
//     dispatch(deleteOrder(order._id));
//   }

