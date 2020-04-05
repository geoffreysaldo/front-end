import React from 'react';
import { Route } from 'react-router-dom';
import { isAuthenticated } from './services/auth-helper'

export const ProtectedRoute = ({ component:Component, ...rest }) => {
    return(
        <Route
            {...rest}
            render={props => {
                if(isAuthenticated()){
                return <Component {...props}/>
            }}}
        />
    )
}