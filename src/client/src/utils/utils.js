export const putDataToLocalStore=(namespace, data)=>{
	if (data) {
		localStorage.setItem(namespace, JSON.stringify(data));
	}
};

export const getDataFromLocalStore=(namespace)=>{
	var store = localStorage.getItem(namespace);
	return (store && JSON.parse(store)) || {};
};

export const dateToString=(date)=>{
	let str="";
	if(date){
		str=date.toISOString();
	}
	return str;
};

export const stringToDate=(str)=>{
	let date="";
	if(str){
		date=new Date(Date.parse(str));
	}
	return date;
};
