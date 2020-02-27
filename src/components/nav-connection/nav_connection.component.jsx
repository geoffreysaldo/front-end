import React, { Component } from 'react';
import ButtonShopContainer from '../button-shop-container/button_shop_container.component';
import PanelConnected from '../panel-connected/panel_connected.component';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';


import './nav_connection.styles.scss'

class NavConnection extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };
    constructor(props){
        super(props)
        const { cookies } = this.props;

    }

    CONNECTION_MODE = {
        "DECONNECTED" : <ButtonShopContainer/> ,
        "CONNECTED" : <PanelConnected token={this.props.cookies.get('token')}/>
    }

    render(){
        return(
            <div>
            {
            this.props.cookies.get('token') != undefined ?  this.CONNECTION_MODE["CONNECTED"] : this.CONNECTION_MODE["DECONNECTED"]
            }
            </div>
        )
    }

}

export default withCookies(NavConnection)