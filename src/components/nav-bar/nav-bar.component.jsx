import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../themes/theme.js'
import './nav-bar.styles.scss'

import CartIcon from '../cart-icon/cart_icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

export default function NavBar() {

  const [value, setValue] = React.useState('Homepage');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <BottomNavigation  showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction  label="Homepage" value="Homepage" component={Link} to={"/"}/>
        <BottomNavigationAction  label="Poke bowl" value="Poke bowl" component={Link} to={"/pokebowl"}/>
        <BottomNavigationAction label="Entrées" value="Entrées" component={Link} to={"/entree"}/>
        <BottomNavigationAction  label="Désserts" value="Désserts" component={Link} to={"/dessert"}/>
        <BottomNavigationAction  label="Boissons" value="Boissons" component={Link} to={"/boisson"}/>
        <BottomNavigationAction  label="Formule midi" value="Formule midi" component={Link} to={"/formule"}/>
        <CartIcon className="cart-icon"/>
      </BottomNavigation>
      <CartDropdown/>
    </MuiThemeProvider>
  );
}
