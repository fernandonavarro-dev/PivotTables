import React, { useEffect } from 'react';
// import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { createStockevent } from '../actions/stockeventActions';
import PostOrderSteps from '../components/PostOrderSteps';
// import { usedispatch } from 'react-redux';

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const { cartItems, shipping } = cart;
    // if (!shipping.address || !shipping.customerTel ) {
    //     props.history.push("/shipping");
    // }
    // console.log("cart, ", cart);
    // console.log("shipping, ", shipping);


    const subtotal = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const commission = cartItems.reduce((a, c) => a + c.commission * c.qty, 0);
    const taxPrice = shipping.invoice * subtotal;
    const totalNoShipping = Number(subtotal) + taxPrice
    const total = Number(subtotal) + Number(shipping.shippingCost) + taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        cartItems.map(cartItem => {
            dispatch(createStockevent(cartItem, shipping, total))
            console.log("cartItem, shipping, total =>", cartItems, shipping, total);
        })
        // dispatch(createOrder(cartItems, shipping, subtotal, commission, taxPrice, totalNoShipping, total));
        // props.history.push("/profile");
        // props.hisotry.push("/orders/");


        // console.log("cartItems, shipping, subtotal, taxPrice, totalNoShipping, total =>", cartItems, shipping, subtotal, taxPrice, totalNoShipping, total);
    }

    useEffect(() => {
        if (success) {
            props.hisotry.push("/profile");
        }
    }, [success, props.history]);

    return <div>
        <PostOrderSteps step1 step2 step3></PostOrderSteps>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>
                        Shipping
          </h3>
                    <div>
                        {cart.shipping.customerName}, {cart.shipping.customerTel},
                        {cart.shipping.address}, {cart.shipping.city}, {cart.shipping.colony},
          {cart.shipping.zip}
                    </div>
                </div>
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {cart.shipping.paymentMethod}
                    </div>
                    <div>
                        Invoice Pct Charge: {cart.shipping.invoice * 100} %
                    </div>
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
                        {
                            cartItems.length === 0 ?
                                <div>
                                    Cart is empty
          </div>
                                :
                                cartItems.map(item =>
                                    <li key={item.name}>
                                        <div className="cart-image">
                                            <img src={item.image} alt="product" />
                                        </div>
                                        <div className="cart-name">
                                            <div>
                                                <Link to={"/product/" + item.product}>
                                                    {item.name}
                                                </Link>

                                            </div>
                                            <div>
                                                Qty: {item.qty}
                                            </div>
                                        </div>
                                        <div className="cart-price">
                                            ${item.price}
                                        </div>
                                    </li>
                                )
                        }
                    </ul>
                </div>


            </div>
            <div className="placeorder-action">
                <ul>
                    <li>
                        <button className="button primary full-width" onClick={placeOrderHandler} >Place Order</button>
                    </li>
                    <li>
                        <h3>Order Summary</h3>
                    </li>
                    <li>
                        <div>Plaza: </div>
                        <div>{cart.shipping.plaza}</div>
                    </li>
                    <li>
                        <div>Subtotal</div>
                        <div>${subtotal}</div>
                    </li>
                    <li>
                        <div>Commission</div>
                        <div>${commission}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${shipping.shippingCost}</div>
                    </li>
                    <li>
                        <div>Invoice Tax</div>
                        <div>${taxPrice}</div>
                    </li>
                    <li>
                        <div className="placeorder-action-total">Total NO Shipping</div>
                        <div className="placeorder-action-total">${totalNoShipping}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div>${total}</div>
                    </li>
                </ul>



            </div>

        </div>
    </div>

}

export default PlaceOrderScreen;

 // const placeOrderHandler = () => {
    //     props.history.push("/login?redirect=shipping");
    //     dispatch(createOrder({
    //         orderItems: shipping, subtotal, taxPrice, totalNoShipping, total
    //     }));

    //     console.log("orderItems: cartItems, shipping, subtotal, taxPrice, totalNoShipping, total =>", cartItems, shipping, subtotal, taxPrice, totalNoShipping, total);
    // }