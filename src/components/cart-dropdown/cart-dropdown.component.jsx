import React from 'react';
import { connect } from 'react-redux';
import { deleteCommandProduct } from '../../redux/command-products/command_products.actions'

import './cart-dropdown.styles.scss'
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';

const CartDropdown  = (props) => (

        <div className='cart-dropdown'>

        <List style={{overflowY :"scroll",height:"250px"}}>

        {
          props.commandProducts.map((product,index) => (
            <ListItem key={index}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
              <ListItemText primary={<div style={{alignItems:"center", fontSize:"12px"}}>{product.name}</div>}
                secondary={
                    <React.Fragment>
                      <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                      >
                 {product.quantity} x {product.price.toFixed(2)} € 
              </Typography>
            </React.Fragment>

          }
        />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => props.deleteCommandProduct(product.name)}>
                      <DeleteIcon  />
                    </IconButton>
                  </ListItemSecondaryAction>
        </ListItem>
          ))
        }
        </List>

      <div className='footer'>
        <Divider />
          <div  style={{fontWeight:"bold",margin:"10px"}} >
          Total TCC: {props.commandProducts.reduce((acc,product) => acc + product.quantity * product.price, 0).toFixed(2) } €
          </div >
      </div>

            <Button variant="contained" color="primary" ><Link style={{color:'white',width:'120%'}} to="/validation_commande">Commander</Link></Button>
        </div>
      );



const mapStateToProps = state => ({
  commandProducts : state.commandProducts.commandProducts
})

const mapDispatchedToProps = dispatch => ({
  deleteCommandProduct: product => dispatch(deleteCommandProduct(product)),
})
export default connect(mapStateToProps, mapDispatchedToProps)(CartDropdown)
