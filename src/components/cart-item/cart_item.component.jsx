import React from 'react';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import './cart_item.styles.scss';

import { connect } from 'react-redux';
import { deleteCommandProduct } from '../../redux/command-products/command_products.actions'



const CartItem = (props) => {


  return(
    <div>
        <div className="nameAndDelete">
            <div>{props.product}</div>
            <div><DeleteIcon onClick={() => props.deleteCommandProduct(props.product)} style={{cursor:"pointer"}}/></div>
        </div>
        <div className='item'>
            <div> x {props.quantity}</div>
            <div>{props.price}</div>
        </div>
    </div>
)}

const mapStateToProps = state => ({
  commandProducts : state.commandProducts.commandProducts
})

const mapDispatchedToProps = dispatch => ({
  deleteCommandProduct: product => dispatch(deleteCommandProduct(product)),
})

export default connect(mapStateToProps, mapDispatchedToProps)(CartItem)
