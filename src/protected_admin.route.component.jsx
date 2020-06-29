import React from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated, isAdmin } from './services/auth-helper'

export const ProtectedRouteAdmin = ({ component:Component, ...rest }) => {
    return(
        <Route
            {...rest}
            render={props => {
                if(isAuthenticated() && isAdmin()){
                return <Component {...props}/>
            }}}
        />
    )
}