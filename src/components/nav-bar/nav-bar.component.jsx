import React, { Component } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';

import { ReactComponent as LogoLuchiwa } from '../../assets/logo-luchiwa.svg';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../../themes/theme.js';
import './nav-bar.styles.scss';

import NavConnection from '../nav-connection/nav_connection.component';
import { connect } from 'react-redux';

import { isAdmin } from '../../services/auth-helper';

 class NavBar extends Component {

  constructor(props){
    super(props)
    this.state={
      value:"",
    }

    this.handleChange = this.handleChange.bind(this)
  }

  //[value, setValue] = React.useState('Homepage');

  handleChange = (newValue) => {
    this.setState({value:newValue})
  };

render(){
  return (
    <MuiThemeProvider theme={theme}>
      {this.props.admin.admin == true || isAdmin() ? 
        <div>
          <div style={{ background: 'linear-gradient(#343332, #343333)',width:'100%', minWidth:'900px',height:'50px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <LogoLuchiwa style={{marginLeft:'20px',marginTop:'px', cursor:'pointer'}} className='logo_luchiwa'/>
            <NavConnection />
          </div>
          <BottomNavigation  showLabels value={this.state.value} onChange={this.handleChange} style={{width:'100%', minWidth:'900px',height:'60px'}} >
            <BottomNavigationAction  label="Commandes" value="Commandes" component={Link} to={"/commandes"}/>
            <BottomNavigationAction  label="Produits" value="Produits" component={Link} to={"/produits"}/>
            <BottomNavigationAction  label="Historique" value="Historique" component={Link} to={"/historique"}/>
            <BottomNavigationAction  label="Horaires" value="Calendrier" component={Link} to={"/calendrier"}/>
            <BottomNavigationAction  label="Clients" value="Clients" component={Link} to={"/clients"}/>
            <BottomNavigationAction  label="Secteur" value="Secteur" component={Link} to={"/secteur"}/>
          </BottomNavigation> 
        </div>
          :
        <div>
          <div style={{ background: 'linear-gradient(#343332, #343333)',width:'100%', minWidth:'900px',height:'50px',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
            <LogoLuchiwa style={{marginLeft:'20px',marginTop:'px', cursor:'pointer'}} className='logo_luchiwa'/>
            <NavConnection />
          </div>
          <BottomNavigation  showLabels value={this.state.value} onChange={this.handleChange} style={{width:'100%', minWidth:'900px',height:'60px'}} >
            <BottomNavigationAction  label="Homepage" value="Homepage" component={Link} to={"/"}/>
            <BottomNavigationAction  label="Plateaux" value="Plateaux" component={Link} to={"/plateaux"}/>
            <BottomNavigationAction label="Entrées" value="Entrées" component={Link} to={"/entree"}/>
            <BottomNavigationAction  label="Désserts" value="Désserts" component={Link} to={"/dessert"}/>
            <BottomNavigationAction  label="Boissons" value="Boissons" component={Link} to={"/boisson"}/>
            <BottomNavigationAction  label="Formule midi" value="Formule midi" component={Link} to={"/formule"}/>
          </BottomNavigation>
        </div>
      }

    </MuiThemeProvider> 
  )};
}

const mapStateToProps = state => ({
  admin : state.admin
})
export default connect(mapStateToProps)(NavBar)
