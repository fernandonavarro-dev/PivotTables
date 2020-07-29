import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveShipping } from '../actions/cartActions';
import PostOrderSteps from '../components/PostOrderSteps';

function ShippingScreen(props) {

    const [customerName, setCustomerName] = useState('');
    const [customerTel, setCustomerTel] = useState('')
    const [address, setAddress] = useState('');
    const [colony, setColony] = useState('')
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({ customerName, customerTel, address, colony, city, zip }));
        props.history.push('delivery');
    }
    return <div>
        <PostOrderSteps step1 step2 ></PostOrderSteps>
        <div className="form">
            <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                        <h2>Shipping</h2>
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
                        <button type="submit" className="button primary">Place Order</button>
                    </li>

                </ul>
            </form>
        </div>
    </div>

}
export default ShippingScreen;