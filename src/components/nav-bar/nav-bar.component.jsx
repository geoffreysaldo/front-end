import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoLuchiwa } from '../../assets/logo-luchiwa.svg';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../themes/theme.js'
import './nav-bar.styles.scss'

import NavConnection from '../nav-connection/nav_connection.component'
import ButtonShopContainer from '../button-shop-container/button_shop_container.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { connect } from 'react-redux'


 const NavBar = (hidden) => {

  const [value, setValue] = React.useState('Homepage');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ background: 'linear-gradient(#343332, #343333)',width:'100%', minWidth:'900px',height:'50px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <LogoLuchiwa style={{marginLeft:'20px',marginTop:'px', cursor:'pointer'}} className='logo_luchiwa'/>
        <NavConnection />
      </div>
      <BottomNavigation  showLabels value={value} onChange={handleChange} style={{width:'100%', minWidth:'900px',height:'60px'}} >
        <BottomNavigationAction  label="Homepage" value="Homepage" component={Link} to={"/"}/>
        <BottomNavigationAction  label="Poke bowl" value="Poke bowl" component={Link} to={"/pokebowl"}/>
        <BottomNavigationAction label="Entrées" value="Entrées" component={Link} to={"/entree"}/>
        <BottomNavigationAction  label="Désserts" value="Désserts" component={Link} to={"/dessert"}/>
        <BottomNavigationAction  label="Boissons" value="Boissons" component={Link} to={"/boisson"}/>
        <BottomNavigationAction  label="Formule midi" value="Formule midi" component={Link} to={"/formule"}/>
      </BottomNavigation>
      {hidden.hidden ? null : <CartDropdown />}
    </MuiThemeProvider>
  );
}

const mapStateToProps = state => ({
  hidden : state.cart.hidden
})

export default connect(mapStateToProps)(NavBar)
