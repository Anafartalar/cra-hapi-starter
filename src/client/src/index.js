import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Providers from "./containers/Providers";
import { BrowserRouter as Router } from "react-router-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import './index.css';
//import flexboxgrid from "flexboxgrid";

injectTapEventPlugin();


const Index = () => {

  return (
    <Providers>
      <Router>
        <App />
      </Router>
    </Providers>

  );

};





ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

//https://medium.com/@ktruong008/absolute-imports-with-create-react-app-4338fbca7e3d
