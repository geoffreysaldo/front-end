import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag2.svg';

import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions'

import './cart_icon.styles.scss';

const CartIcon = ({toggleCartHidden, itemsCount}) => (
        <div className='cart-icon' onClick={toggleCartHidden} >
            <ShoppingIcon className="shopping-icon" />
        <span className='item-count'>{itemsCount}</span>
        </div>
)

const mapStateToProps = state => ({
    commandProducts : state.commandProducts.commandProducts,
    itemsCount : state.commandProducts.commandProducts.reduce((accumalatedQuantity, product) => accumalatedQuantity + product.quantity , 0)
})


const mapDispatchedToProps = dispatch => ({
    toggleCartHidden : () => dispatch(toggleCartHidden())
})

export default connect(mapStateToProps,mapDispatchedToProps)(CartIcon)