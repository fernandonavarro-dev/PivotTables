import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import PostOrderSteps from '../components/PostOrderSteps';

function ShippingScreen(props) {

    const [plaza, setPlaza] = useState('');
    // const [qtyPlaza, setQtyPlaza] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerTel, setCustomerTel] = useState('');
    const [address, setAddress] = useState('');
    const [colony, setColony] = useState('')
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [shippingCost, setShippingCost] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [invoice, setInvoice] = useState(null);
    const [comments, setComments] = useState('');

    const dispatch = useDispatch();

    // const handlePlazaSelect = (e) => {
    //     // const value = e.target.value
    //     setPlaza(e.target.value);
    //     setQtyPlaza("qty" + plaza);
    //     // console.log("plaza, ", plaza);
    //     // console.log("qtyPlaza, ", qtyPlaza);
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ plaza, customerName, customerTel, address, colony, city, zip, shippingCost, paymentMethod, invoice, comments }));
        props.history.push('placeorder');
    }

    // setQtyPlaza("qty" + plaza)
    console.log("plaza, ", plaza);


    return <div>
        <PostOrderSteps step1 step2 ></PostOrderSteps>
        <div className="form">
            <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                        <h3>Shipping Info</h3>
                    </li>
                    <li>
                        Plaza: <select value={plaza} required={true} onChange={(e) => {
                            setPlaza(e.target.value)
                        }}>
                            {/* Plaza: <select value={plaza} required={true} onChange={handlePlazaSelect}> */}
                            <option value="void">select</option>
                            <option value="CDMX">CDMX</option>
                            <option value="CUN">Cancun</option>
                            <option value="MTY">Monterrey</option>
                            <option value="PLAYA">Playa del Carmen</option>
                            <option value="PBL">Puebla</option>
                            <option value="QRO">Queretaro</option>
                            <option value="TUL">Tulum</option>
                        </select>
                    </li>
                    <li>
                        <label htmlFor="customerName">
                            Customer Name
          </label>
                        <input type="text" name="customerName" id="customerName" onChange={(e) => setCustomerName(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="customerTel">
                            Customer Tel
          </label>
                        <input type="text" name="customerTel" id="customerTel" onChange={(e) => setCustomerTel(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="address">
                            Address
          </label>
                        <input type="text" name="address" id="address" onChange={(e) => setAddress(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="colony">
                            Colony
          </label>
                        <input type="text" name="colony" id="colony" onChange={(e) => setColony(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="zip">
                            Postal Code
          </label>
                        <input type="text" name="zip" id="zip" onChange={(e) => setZip(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="city">
                            City
          </label>
                        <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                        </input>
                    </li>
                    <li>
                        <label htmlFor="shippingCost">
                            Shipping Cost $
          </label>
                        <input type="number" name="shippingCost" id="shippingCost" onChange={(e) => setShippingCost(e.target.value)}>
                        </input>
                    </li>
                </ul>
                <ul className="form-container">
                    <li>
                        <h3>Payment Method</h3>
                    </li>

                    <li>
                        <div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="paymentMethod"
                                value="cash"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                            <label htmlFor="paymentMethod">cash</label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="paymentMethod"
                                value="creditCard"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                            <label htmlFor="paymentMethod">credit card</label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="radio"
                                name="paymentMethod"
                                id="paymentMethod"
                                value="bankTransfer"
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            ></input>
                            <label htmlFor="paymentMethod">bank transfer</label>
                        </div>
                    </li>

                    <li>
                        <h4>Invoice</h4>
                    </li>

                    <li>
                        <div>
                            <input
                                type="radio"
                                name="invoice"
                                id="invoice"
                                value={0}
                                onChange={(e) => setInvoice(e.target.value)}
                            ></input>
                            <label htmlFor="invoice">no</label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input
                                type="radio"
                                name="invoice"
                                id="invoice"
                                value={0.15}
                                onChange={(e) => setInvoice(e.target.value)}
                            ></input>
                            <label htmlFor="invoice">yes</label>
                        </div>
                    </li>


                </ul>
                <ul className="form-container">
                    <li>
                        <label htmlFor="comments">
                            Comments
          </label>
                        <input type="text" name="comments" id="comments" onChange={(e) => setComments(e.target.value)}>
                        </input>
                    </li>


                </ul>
                <ul className="form-container">
                    {(!address || !customerTel || !shippingCost || !paymentMethod || !invoice || (!colony && !zip)) ? "" :
                        <li>
                            <button type="submit" className="button primary">Continue</button>
                        </li>
                    }
                </ul>
            </form>
        </div>
    </div>

}
export default ShippingScreen;