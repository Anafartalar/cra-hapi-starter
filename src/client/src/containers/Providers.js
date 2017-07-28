import React from "react";
import {Provider} from "mobx-react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blueGrey500,blueGrey700} from 'material-ui/styles/colors';
import Stores from "stores/stores";
import States from "stores/states";

//import Stores from "./stores/index";


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blueGrey500,
    primary2Color: blueGrey700,
    pickerHeaderColor: blueGrey500
  }
});

const providers=(props)=>{

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider states={States} stores={Stores} >
        {props.children}
      </Provider>
    </MuiThemeProvider>
  );

};

export default providers;
