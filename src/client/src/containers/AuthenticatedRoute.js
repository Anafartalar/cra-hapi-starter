import React, { Component } from 'react';
import { inject,observer } from "mobx-react";
import { Route, Redirect } from 'react-router-dom'

@inject("stores")
@observer
export default class AuthenticatedRoute extends Component {

    render() {

        const { component: C, stores, ...rest } = this.props;

        return (
            <Route {...rest} render={props => (
                stores.user.isAuth ? (<C {...props} />)
                    : (
                        <Redirect to={{ pathname: '/login' }} />
                    )
            )} />
        );

    }
}


// https://tylermcginnis.com/react-elements-vs-react-components/