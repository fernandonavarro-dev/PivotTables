import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PostOrderSteps from '../components/PostOrderSteps';
import { detailsOrder } from '../actions/orderActions';

function FinalizeOrderScreen(props) {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();

    const deliveredHandler = () => {
        // create an order
        // dispatch(updateOrder());
        // dispatch(updateStock());
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(detailsOrder(props.match.params.id))
        }

    }, []);

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, orderData, orderItems, error } = orderDetails;

    const order = { ...orderData }
    const cartItems = [{ ...orderItems }]
    // const [orderItems] = Object.entries({ cartItems })

    // console.log("orderData inside FinalizeOrderScreen, ", orderData);
    // console.log("order inside FinalizeOrderScreen, ", order);
    console.log("orderItems inside FinalizeOrderScreen, ", orderItems);
    console.log("cartItems[0] inside FinalizeOrderScreen, ", cartItems[0]);
    // console.log("orderItems.Array inside FinalizeOrderScreen, ", orderItems.Array);

    return <div>
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
                                {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
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
                                {cartItems.map(cartItem =>
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
                                )}
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
                            {/* <li>
                            <div>Items</div>
                            <div>${order.itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${order.shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${order.taxPrice}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${order.totalPrice}</div>
                        </li> */}
                        </ul>



                    </div>

                </div>
            </div>
        }
    </div>

}

export default FinalizeOrderScreen;