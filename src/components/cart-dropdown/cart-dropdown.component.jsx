import React from 'react';
import { connect } from 'react-redux';

import './cart-dropdown.styles.scss'
import Button from '@material-ui/core/Button';

const CartDropdown  = (props) => (

        <div className='cart-dropdown'>
        <div style={{overflowY :"scroll"}}>
        {
          props.commandProducts.map((product,index) => (
            <h5 key = {index }>{product}</h5>
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
