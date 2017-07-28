import React, { Component } from 'react';
import Routes from "./containers/Routes";
import { observer, inject } from "mobx-react";
import ErrorDialog from "components/ErrorDialog";
import { withRouter } from 'react-router'
import Header from "components/Header";
import Drawer from "components/Drawer";



@inject("states", "stores")
@withRouter
@observer
export default class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.myState = this.props.states.layout;
  }

  signOut = () => {
    this.props.stores.user.signOut();
    //this.props.history.replace("/login");
  }

  navigateTo = (path) => {
    if(this.props.location.pathname==path) return;
    
    this.props.history.push(path);

  }

  setDrawerStatus = (status) => {
    this.myState.openDrawer = status;
  }



  render() {
    return (
      <div>
        <ErrorDialog handleClose={() => this.myState.clearError()}
          open={this.myState.isError} content={this.myState.errorText} />

        <Header userAuth={this.props.stores.user.isAuth}
          setDrawerStatus={this.setDrawerStatus} signOut={this.signOut} />

        <Drawer open={this.myState.openDrawer} navigateTo={this.navigateTo} 
          setDrawerStatus={this.setDrawerStatus} />

        <Routes />
      </div>
    );
  }
}

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md