import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listOpenOrders } from '../actions/orderActions';

function OrdersScreen() {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const openOrderList = useSelector(state => state.openOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = openOrderList;

    const dispatch = useDispatch();

    const useSortableData = (items, config = null) => {
        const [sortConfig, setSortConfig] = React.useState(config);

        const sortedItems = React.useMemo(() => {
            let sortableItems = items;
            if (sortConfig !== null) {
                sortableItems.sort((a, b) => {
                    if (a[sortConfig.key] < b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                    return 0;
                });
            }
            return sortableItems;
        }, [items, sortConfig]);

        const requestSort = key => {
            let direction = 'ascending';
            if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
                direction = 'descending';
            }
            setSortConfig({ key, direction });
        }

        return { items: sortedItems, requestSort };
    }

    const { items, requestSort } = useSortableData(orders);


    useEffect(() => {
        dispatch(listOpenOrders());
        return () => {
            //
        };
    }, [dispatch, userInfo]);

    return (
        <div>
            <div className="content content-margined">

                <div className="order-header">
                    <h3>Orders</h3>
                </div>
                {userInfo && userInfo.user.isAdmin && (

                    <div className="order-list">
                        {
                            loadingOrders ? <div>Loading...</div> :
                                errorOrders ? <div>{errorOrders} </div> :
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <button type="button" onClick={() => requestSort('id')}>
                                                        ORDER ID
            </button></th>
                                                <th>
                                                    <button type="button" onClick={() => requestSort('customerName')}>
                                                        CUSTOMER
            </button></th>
                                                <th>
                                                    <button type="button" onClick={() => requestSort('customerTel')}>
                                                        CUSTOMER TEL
            </button></th>
                                                <th>
                                                    <button type="button" onClick={() => requestSort('sellerUsername')}>
                                                        SELLER
            </button></th>
                                                <th>
                                                    <button type="button" onClick={() => requestSort('plaza')}>
                                                        PLAZA
            </button></th>
                                                <th>
                                                    <button type="button" onClick={() => requestSort('total')}>
                                                        TOTAL
            </button></th>
                                                <th>
                                                    <button type="button" onClick={() => requestSort('commission')}>
                                                        COMMISSION
            </button></th>
                                                <th>
                                                    <button type="button" onClick={() => requestSort('status')}>
                                                        STATUS
            </button></th>
                                                {/* <th>CREATED AT</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order =>
                                                <tr key={order.id}>
                                                    <td >{order.id}</td>
                                                    <td >{order.customerName}</td>
                                                    <td >{order.customerTel}</td>
                                                    <td >{order.sellerUsername}</td>
                                                    <td>{order.plaza}</td>
                                                    <td>${order.total}</td>
                                                    <td>${order.commission}</td>
                                                    <td>{order.status}</td>
                                                    {/* <td>{order.created_at}</td> */}
                                                    <td>
                                                        <Link
                                                            to={{ pathname: "/order/" + order.id, state: { plaza: order.plaza } }}
                                                        // to={"/order/" + order.id}
                                                        >DETAILS</Link>
                                                        {' '}
                                                    </td>
                                                </tr>)}
                                        </tbody>
                                    </table>
                        }
                    </div>
                )}

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

