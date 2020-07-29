import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveDelivery } from '../actions/cartActions';
import PostOrderSteps from '../components/PostOrderSteps';

function DeliveryScreen(props) {
    // const [deliveryMethod, setDeliveryMethod] = useState('');

    const [shippingCost, setShippingCost] = useState(0);
    const [coordinator, setCoordinator] = useState('')
    const [notes, setNotes] = useState('')
    const [deliveryPerson, setDeliveryPerson] = useState('')
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveDelivery({ shippingCost, coordinator, deliveryPerson, notes }));
        // props.history.push('completeorder');
    };
    return (
        <div>
            <PostOrderSteps step1 step2 step3></PostOrderSteps>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Delivery Info</h2>
                        </li>

                        {/* <li>
                            <div>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    id="paymentMethod"
                                    value="paypal"
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                ></input>
                                <label for="paymentMethod">Paypal</label>
                            </div>
                        </li> */}
                        <li>
                            <label htmlFor="shippingCost">
                                Shipping Cost $
          </label>
                            <input type="number" name="shippingCost" id="shippingCost" onChange={(e) => setShippingCost(e.target.value)}>
                            </input>
                        </li>
                        <li>
                            <label htmlFor="coordinator">
                                Coordinator
          </label>
                            <input type="text" name="coordinator" id="coordinator" onChange={(e) => setCoordinator(e.target.value)}>
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
                            <button type="submit" className="button primary">
                                Continue
              </button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}
export default DeliveryScreen;
