import React from 'react';
import CartIcon from '../cart-icon/cart_icon.component'
import ButtonSignIn from '../button-signin/button_signin.component';
import ButtonSignUp from '../button-signup/button_signup.component';
import './button_shop_container.styles.scss';

const ButtonShopContainer = () => (
        <div className='container' >
            <ButtonSignIn/>
            <ButtonSignUp/>
            <CartIcon className="cart-icon"/>
        </div>
)


export default ButtonShopContainer