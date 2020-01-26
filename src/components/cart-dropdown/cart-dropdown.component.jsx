import React from 'react';
import { connect } from 'react-redux';

import './cart-dropdown.styles.scss'
import Button from '@material-ui/core/Button';
import CartItem from '../cart-item/cart_item.component'

const CartDropdown  = (props) => (

        <div className='cart-dropdown'>
        <div style={{overflowY :"scroll"}}>
        {
          props.commandProducts.map((product,index) => (
            <CartItem key={index} product={product.name} price={product.price} quantity={product.quantity}/>
          ))
        }
        </div>
            <Button variant="contained" color="primary" onClick={ () => console.log(props)} >Commander</Button>
        </div>
      );



const mapStateToProps = state => ({
  commandProducts : state.commandProducts.commandProducts
})

export default connect(mapStateToProps)(CartDropdown)
