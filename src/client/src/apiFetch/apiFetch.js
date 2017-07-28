import Stores from "stores/stores";
import User from "./user";

 const checkStatus=(rawResponse)=> {
   if (rawResponse.status >= 200 && rawResponse.status < 300) {
     return rawResponse.json();

   } else {
       return rawResponse.json().then((response)=>{
           // sing out when token expires
           if(response.statusCode===401 && Stores.user.isAuth){
               Stores.user.signOut();
           }

           let error = new Error(response.message);
           throw error;
       });
   }
 };



 const apiFetch=()=>{

     const getToken=()=>{
         return Stores.user.token;
     }

     return {
         user:User(checkStatus)
     };

 }

 export default apiFetch();