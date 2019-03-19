

export  function decompose_show(episodes){

	//organzie and optimize API call data here

	console.log("checking episodes object", episodes);

	let seasons = [];
	let seasonCount = 0;



		try{

		seasonCount = episodes[episodes.length-1]['season'];
	 	seasons = episodes.reduce((obj,v,i) =>{
			obj[v.season] = obj[v.season] || [];
			obj[v.season].push(v);
			return obj;
		}, {})
	}
	catch(error){
		console.log("error in seasons.reduce", error);
	}
	

		console.log("debugging decompose_show",seasons);
	return {
		seasons: seasons, seasonCount: seasonCount, 
	}
}
