
const ADD_SEASONS = "ADD_SEASONS";
const initialState={
	
	data: [],
	

}
export const seasons = (state = initialState, action)=>{
	switch(action.type){

	case ADD_SEASONS:
		return {...state, data: action.seasons}
	
	default :
		return state;
	}
}

