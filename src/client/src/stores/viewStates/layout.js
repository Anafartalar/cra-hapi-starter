import {observable,action} from "mobx";


export default class LayoutState{
  @observable isError=false;
  @observable errorText="";
  @observable activeRequest=0;
  @observable netRequestCount=0;
  @observable openDrawer=false;


  @action setError(message){

    if(!message) message="Bilinmeyen bir hata oluştu!";
    this.errorText=message;
    this.isError=true;
  }

  @action clearError(){
    this.errorText="";
    this.isError=false;
  }

  @action netRequestInc(){
    this.netRequestCount+=1;
  }

  @action netRequestDec(){
    this.netRequestCount-=1;
  }

}
