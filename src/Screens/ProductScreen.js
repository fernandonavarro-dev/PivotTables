/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, stockCountProduct } from '../actions/productActions';
import { addToCart, savePlaza } from '../actions/cartActions';

function ProductScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { cartItems, plaza } = cart;

    const [qty, setQty] = useState(1);

    const productDetails = useSelector((state) => state.productDetails);
    const dispatch = useDispatch();
    const { product, loading, error } = productDetails;

    const productStockCount = useSelector((state) => state.productStockCount);
    const { productsStock } = productStockCount;

    let productsAvailable = { product: { countInStock: 0 } };
    if (product && productsStock) {
        productsAvailable = productsStock.find((x) => {
            // console.log(x.name === product.name, '=>', x.name, '=', product.name);
            return product.name.indexOf(x.name) >= 0;
        }) || { product: { countInStock: 0 } };
    }
    const productPlazaId = productsAvailable.id
    // const countInStock = productsAvailable.product[plaza + '_product'] || 0;
    const countInStock = productsAvailable.countInStock || 0;

    useEffect(() => {
        // if (!product || !product.name) {
        //     dispatch(detailsProduct(props.match.params.id));
        // }
        dispatch(detailsProduct(props.match.params.id));
        dispatch(stockCountProduct(plaza));

        return () => {
            //
        };
    }, [dispatch, props.match.params.id, plaza]);

    const handleAddToCart = () => {
        dispatch(addToCart(product.id, qty, countInStock, productPlazaId));
        alert('Added to cart');
    };

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                        <>
                            <div className="back-to-result">
                                <Link to="/">Back to products</Link>
                            </div>

                            <ul className="filter">

                                {cartItems.length > 0 ?
                                    <h3>Plaza: {plaza}</h3>
                                    :
                                    <li>
                                        Plaza:{' '}
                                        <select
                                            value={plaza}
                                            onChange={(e) => {
                                                dispatch(savePlaza(e.target.value));
                                            }}
                                        >
                                            <option value="">select</option>
                                            <option value="cdmx">CDMX</option>
                                            <option value="cun">Cancun</option>
                                            <option value="mty">Monterrey</option>
                                            <option value="playa">Playa del Carmen</option>
                                            <option value="pbl">Puebla</option>
                                            <option value="qro">Queretaro</option>
                                            <option value="tulum">Tulum</option>
                                        </select>
                                    </li>
                                }

                            </ul>
                            <div className="details">
                                <div className="details-image">
                                    <img src={product.imageURL} alt="product"></img>
                                </div>
                                <div className="details-info">
                                    <ul>
                                        <li>
                                            <h4>{product.name}</h4>
                                        </li>
                                        <li>
                                            Price: <b>${product.price}</b>
                                        </li>
                                        <li>
                                            Commission: <b>${product.commission}</b>
                                        </li>
                                        <li>
                                            Description:
                  <div>{product.description}</div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="details-action">
                                    <ul>
                                        <li>Price: $ {product.price}</li>
                                        <li>Status: {countInStock > 0 ? 'In stock' : ''}</li>
                                        <li>
                                            Qty:
                  <select
                                                value={qty}
                                                onChange={(e) => {
                                                    setQty(e.target.value);
                                                }}
                                            >
                                                {' '}
                                                {[...Array(countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </li>
                                        <li>
                                            {countInStock > 0 && (
                                                <button
                                                    onClick={handleAddToCart}
                                                    className="button primary"
                                                >
                                                    Add to order
                                                </button>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}
        </div>
    );
}

export default ProductScreen;