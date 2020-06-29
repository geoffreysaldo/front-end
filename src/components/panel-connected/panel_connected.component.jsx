import React , { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from 'react-router-dom';


import CartIcon from '../cart-icon/cart_icon.component';

import { ReactComponent as UserAccount } from '../../assets/user.svg';
import {isAuthenticated,  signout} from '../../services/auth-helper';
import { getNames } from '../../services/api_service';
import './panel_connected.styles.scss';

import { connect } from 'react-redux';
import { setAdmin } from '../../redux/admin/admin.actions';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

class PanelConnected extends Component{
    constructor(props){
        super(props)
        this.state = {
            open:false,
            name:""
        }
        this.handleClick = this.handleClick.bind(this)
        this.logOut = this.logOut.bind(this)
    }

    componentDidMount(){
        getNames(isAuthenticated()).then(
            result => {
                this.setState({
                    name:result.firstname+" "+result.lastname
                })
            }
        )
    }

    handleClick(){
        this.setState({
            open:!this.state.open
        })
    }

    logOut(){
        signout()
        this.props.changeAuthenticate()
        if(this.props.admin){
            this.props.setAdmin(false)
        }
    }


    render(){
        return(
            <div className='container'>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <ListItem button onClick={this.handleClick} style={{background:"#DEDEDE",borderRadius:"4px",maxWidth:"350px",height:"38px",marginTop:"10px",display:"flex",flexDirection:"row"}}>
                        <UserAccount className="user-account"/>
                        <ListItemText primary={this.state.name} />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit style={{background:"#f2f2f2",borderRadius:"4px"}}>
                        <List >
                            <ListItem button component={Link} to={"/compte"}>
                                Mon compte
                            </ListItem>
                            <ListItem  button onClick={this.logOut} component={Link} to={"/"} >
                                Déconnexion
                            </ListItem>

                        </List>
                    </Collapse>
                </div>
                <CartIcon/>
                {this.props.hidden ? null : <CartDropdown />}
            </div>
        )}
}
const mapStateToProps = state => ({
    admin : state.admin.admin,
    hidden : state.cart.hidden
  })

const mapDispatchToProps = dispatch => ({
    setAdmin: value => dispatch(setAdmin(value))
  })

export default connect(mapStateToProps,mapDispatchToProps)(PanelConnected)