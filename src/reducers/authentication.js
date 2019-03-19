// action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";
const DISPLAY_SEASON = "DISPLAY_SEASON";




// reducer with initial state
const initialState = {
  fetching: false,
  tvShow: null,
  error: null,
  seasonCount: 0,
  currentSeason: 0,
  

};

export  const authentication = (state = initialState, action) =>{
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, tvShow: action.tvShow, seasonCount: action.seasonCount, currentSeason: 1 };
    case API_CALL_FAILURE:
      return { ...state, fetching: false,  error: action.error };
   case DISPLAY_SEASON :
      return {...state, currentSeason: action.seasonNumber}
    default:
      return state;
  }
}