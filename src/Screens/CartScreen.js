import React, { useEffect } from 'react';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { usedispatch } from 'react-redux';

function CartScreen(props) {

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart;
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    // console.log("cart, ", cart);
    // console.log("cartItems, ", cartItems);

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [])

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
                            <li>
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
                                        Qty:
                                         <select>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
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
                Subtotal ({cartItems.reduce((accum, current) => accum + current.qty, 0)} items)
                :
            $ {cartItems.reduce((accum, current) => accum + current.price * current.qty, 0)}
            </h3>
            <button className="button primary" disabled={cartItems.length === 0}>
                Proceed to checkout
            </button>

        </div>
    </div>
}

export default CartScreen