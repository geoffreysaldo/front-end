import React, { Component } from 'react';
import ButtonShopContainer from '../button-shop-container/button_shop_container.component';
import PanelConnected from '../panel-connected/panel_connected.component';
import {isAuthenticated} from '../../services/auth-helper';



import './nav_connection.styles.scss'

class NavConnection extends Component{

    constructor(props){
        super(props)
        this.state = {
            auth : isAuthenticated()
        }
    }

    changeAuthenticate(){
        this.setState({
            auth: isAuthenticated()
        })
    }

    CONNECTION_MODE = {
        "DECONNECTED" : <ButtonShopContainer auth={this.auth} changeAuthenticate={this.changeAuthenticate.bind(this)}/> ,
        "CONNECTED" : <PanelConnected token={isAuthenticated()} changeAuthenticate={this.changeAuthenticate.bind(this)}/>
    }

    render(){
        return(
            <div >
            {
            isAuthenticated() !== undefined ?  this.CONNECTION_MODE["CONNECTED"] : this.CONNECTION_MODE["DECONNECTED"]
            }
            </div>
        )
    }

}

export default NavConnection