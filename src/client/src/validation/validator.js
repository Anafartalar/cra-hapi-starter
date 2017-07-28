
const validator=(value,rules)=>{
  let rls=Object.getOwnPropertyNames(rules);
  //if(rls.length==0) return false;

  for (let rule of rls){

    let isError=rules[rule].validate(value);

    if(!isError) return rules[rule].message;
  }

  return false; // false means no error

};
export default validator;