import ApiFetch from "apiFetch/apiFetch";

const namer=(state)=>{

    return {
        setName:(nm)=>{
            state.name=nm;
        },
        getName:()=>state.name
    }

};

const prefixer=(state)=>{

    return{
        prefix(pre){
            return `Hello, ${pre} ${state.name}`;

        }
    }

};

export default ()=>{

    let state={
        name:"Ferdi"
    };

    return Object.assign({},namer(state),prefixer(state));

};



// export default (nm)=>{

//     let name=nm;

//     const getName=()=>{
//         return name;
//     }

//     const setName=(newName)=>{
//         name=newName;
//     }

//     return{getName,setName};

// }