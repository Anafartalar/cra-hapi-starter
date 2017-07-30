import React from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const style = {
  textAlign:"center"
};

const header=({userAuth=false,signOut,setDrawerStatus})=>{

  let signOutBtn=null;

  if(userAuth){
    signOutBtn=<FlatButton onTouchTap={signOut} label="Çıkış Yap" />;
  }




  return(
    <AppBar onLeftIconButtonTouchTap={()=>setDrawerStatus(true)} titleStyle={style}
      title="React App" showMenuIconButton={userAuth} iconElementRight={signOutBtn} />
  );
};

export default header;
