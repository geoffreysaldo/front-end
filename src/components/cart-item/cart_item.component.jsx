import React from 'react';
import './cart_item.styles.scss';

const CartItem = (props) => (
    <div>
        <div>{props.product}</div>
        <div className='item'>
            <div> x {props.quantity}</div>
            <div>{props.price}</div>
        </div>
    </div>
)

export default CartItem