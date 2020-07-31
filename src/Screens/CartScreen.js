import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { usedispatch } from 'react-redux';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;

    // const productId = props.match.params.id;
    // const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }
    // useEffect(() => {
    //     if (productId) {
    //         dispatch(addToCart(productId, qty));
    //     }
    // }, []);

    const checkoutHandler = () => {
        props.history.push("/shipping");
    }

    // const { cartQty } = cartItems
    // console.log("cartItems, ", cartItems);

    return <div className="cart" >
        <div className="cart-list">
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
                            <li key={item.product} >
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
                                        {/* <select
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product, e.target.value))}
                                        >
                                            {[...Array(item.qtyCDMX).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            )}
                                        </select> */}
                                        <button
                                            type="button"
                                            onClick={() => removeFromCartHandler(item.product)}
                                            className="button"
                                            style={{ marginLeft: '1.5rem', marginTop: '1rem' }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    ${item.price}
                                </div>
                            </li>
                        )
                }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </h3>
            {/* <h3>
                Commission ( {cartItems.reduce((a, c) => a + Number(c.qty), 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.commission * c.qty, 0)}
            </h3> */}
            <button
                className="button primary full-width"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
            >
                Proceed to checkout
            </button>

        </div>
    </div>
}

export default CartScreen