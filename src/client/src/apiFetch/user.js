export default (checkStatus)=>{

  const login=(authInfo)=>{

    return fetch('/login',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(authInfo)
    })
    .then(checkStatus)
    .then((response)=>{
      return response;
    });
  };

  return{
     login
  };

};