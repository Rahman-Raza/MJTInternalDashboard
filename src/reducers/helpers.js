

export  function decompose_data(data){

	//organzie and optimize API call data here
	try{

		let arrMap = data.map( (ele, index) => {
			return [ele.payload]
		}).reduce ( (accumulator, v, i) =>{
			return accumulator + v * i
		});



		}
		catch(error){
			console.log("error in seasons.reduce", error);
		}





		console.log("debugging decompose_show",data);
	// return {
	// 	[...data, data +  arrMap]
	// }
}
