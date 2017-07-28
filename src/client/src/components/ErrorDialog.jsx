import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const error=(props)=>{

  const actions = [
  <FlatButton
    label="Tamam"
    primary={true}
    onTouchTap={props.handleClose}
  />
];

  return (
    <Dialog onRequestClose={props.handleClose}
      actions={actions} modal={false} open={props.open}>
      {props.content}
    </Dialog>
  );

};


export default error;
