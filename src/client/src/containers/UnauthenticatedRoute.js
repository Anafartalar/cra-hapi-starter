import React, { Component } from 'react';
import { inject, observer } from "mobx-react";
import { Route, Redirect } from 'react-router-dom'

@inject("stores")
@observer
export default class UnauthenticatedRoute extends Component{

    render(){
        const { component: C, stores, ...rest } = this.props;

        return (
            <Route {...rest} render={props=>(
                stores.user.isAuth 
                ? (<Redirect to={{ pathname: '/' }} />)
                : (<C {...props} />)

                )} />
        );
    }
}