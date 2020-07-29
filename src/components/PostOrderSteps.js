import React from 'react';

function PostOrderSteps(props) {

    return <div className="checkout-steps">
        <div className={props.step1 ? 'active' : ''}>Login</div>
        <div className={props.step2 ? 'active' : ''}>Order</div>
        <div className={props.step3 ? 'active' : ''}>Processing</div>
        <div className={props.step4 ? 'active' : ''}>Delivered</div>
    </div>

}

export default PostOrderSteps;