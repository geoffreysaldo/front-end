import React from 'react';

import './cart-dropdown.styles.scss'
import Button from '@material-ui/core/Button';

export default function CartDropdown () {


    return (
        <div className='cart-dropdown'>
            <div className="cart-item"></div>
            <Button variant="contained" color="primary" >Commander</Button>
        </div>
      );
}