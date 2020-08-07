import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostOrderSteps from '../components/PostOrderSteps';
import { detailsOrder } from '../actions/orderActions';

function FinalizeOrderScreen(props) {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const [deliveryDate, setDeliveryDate] = useState('')
    const [notes, setNotes] = useState('')
    const [deliveryPerson, setDeliveryPerson] = useState('')

    const dispatch = useDispatch();

    // const deliveredHandler = () => {
    //     // create an order
    //     // dispatch(updateOrder());
    //     // dispatch(updateStock());
    // }
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch(saveDelivery({ deliveryDate, deliveryPerson, notes }));
        // props.history.push('completeorder');
    };

    useEffect(() => {
        if (userInfo) {
            dispatch(detailsOrder(props.match.params.id))
        }

    }, []);

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, orderData, error } = orderDetails;

    const orderDataCopy = { ...orderData }
    const { cartItems, ...order } = orderDataCopy
    // const [cartItems] = order
    // const cartItems = [{ ...orderItems }]
    // const [orderItems] = Object.entries({ cartItems })

    // console.log("orderData inside FinalizeOrderScreen, ", orderData);
    console.log("order inside FinalizeOrderScreen, ", order);
    console.log("cartItems inside FinalizeOrderScreen, ", cartItems);
    // console.log("cartItems[0] inside FinalizeOrderScreen, ", cartItems[0]);
    // console.log("orderItems.Array inside FinalizeOrderScreen, ", orderItems.Array);

    return <div>
        <div className="content content-margined" >
            <h3>Order Id: {order.id}</h3>
        </div>
        <PostOrderSteps step1 step2 step3 step4 ></PostOrderSteps>
        {loading ? <div>Loading ...</div> : error ? <div>{error}</div> :

            <div>
                <div className="placeorder">
                    <div className="placeorder-info">
                        <div>
                            <h3>
                                Shipping
          </h3>
                            <div>
                                {order.address}, {order.city},
          {order.zip}, {order.country},
          </div>
                            <div>
                                Status: {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
                            </div>
                        </div>
                        <div>
                            <h3>Payment</h3>
                            <div>
                                Payment Method: {order.paymentMethod}
                            </div>
                            <div>
                                Invoice Pct Charge: {order.invoice * 100} %
                    </div>
                            {/* <div>
                            {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
                        </div> */}
                        </div>
                        <div>
                            <ul className="cart-list-container">
                                <li>
                                    <h3>
                                        Shopping Cart
          </h3>
                                    <div>
                                        Price
          </div>
                                </li>
                                {/* {
                                    cartItems.length === 0 ?
                                        <div>
                                            Cart is empty
          </div>
                                        : */}
                                {/* {cartItems.map(cartItem =>
                                    <li key={cartItem.id}>
                                        <div className="cart-image">
                                            <img src={cartItem.image} alt="product" />
                                        </div>
                                        <div className="cart-name">
                                            <div>
                                                <Link to={"/product/" + cartItem.product}>
                                                    {cartItem.name}
                                                </Link>

                                            </div>
                                            <div>
                                                Qty: {cartItem.qty}
                                            </div>
                                        </div>
                                        <div className="cart-price">
                                            ${cartItem.price}
                                        </div>
                                    </li>
                                )} */}
                                {/* } */}
                            </ul>
                        </div>


                    </div>
                    <div className="placeorder-action">
                        <ul>
                            {/* <li className="placeorder-actions-payment">
                            {loadingPay && <div>Finishing Payment...</div>}
                            {!order.isPaid &&
                                <PaypalButton
                                    amount={order.totalPrice}
                                    onSuccess={handleSuccessPayment} />
                            }
                        </li> */}
                            <li>
                                <h3>Order Summary</h3>
                            </li>
                            <li>
                                <div>Items</div>
                                <div>${order.subtotal}</div>
                            </li>
                            <li>
                                <div>Shipping</div>
                                <div>${order.shippingCost}</div>
                            </li>
                            <li>
                                <div>Tax</div>
                                <div>${order.tax}</div>
                            </li>
                            <li>
                                <div>Order Total</div>
                                <div>${order.total}</div>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="form" >
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>Delivery Info</h2>
                            </li>

                            <li>
                                <label htmlFor="deliveryDate">
                                    Delivery Date
          </label>
                                <input type="text" name="deliveryDate" id="deliveryDate" onChange={(e) => setDeliveryDate(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="deliveryPerson">
                                    Delivery Person
          </label>
                                <input type="text" name="deliveryPerson" id="deliveryPerson" onChange={(e) => setDeliveryPerson(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <label htmlFor="notes">
                                    Notes
          </label>
                                <input type="text" name="notes" id="notes" onChange={(e) => setNotes(e.target.value)}>
                                </input>
                            </li>
                            <li>
                                <h4>Delivery Status</h4>
                            </li>

                            <li>
                                <div>
                                    <input
                                        type="radio"
                                        name="isDelivered"
                                        id="isDelivered"
                                        value={false}
                                        defaultChecked={true}
                                    // onChange={(e) => (setInvoice(e.target.value))}
                                    ></input>
                                    <label htmlFor="isDelivered">Processing</label>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <input
                                        type="radio"
                                        name="isDelivered"
                                        id="isDelivered"
                                        value={true}
                                    // onChange={(e) => (setInvoice(e.target.value))}
                                    ></input>
                                    <label htmlFor="invoice">Delivered</label>
                                </div>
                            </li>

                            <li>
                                <button type="submit" className="button primary">
                                    Update
              </button>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        }
    </div>

}

export default FinalizeOrderScreen;