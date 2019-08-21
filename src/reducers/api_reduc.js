// action types
const API_CALL_REQUEST = "API_CALL_REQUEST";
const API_CALL_SUCCESS = "API_CALL_SUCCESS";
const API_CALL_FAILURE = "API_CALL_FAILURE";
const DISPLAY_SEASON = "DISPLAY_SEASON";




// reducer with initial state
const initialState = {
  fetching: false,
  error: null,
  response: null,



};


export  const api_reduc = (state = initialState, action) =>{
  switch (action.type) {
    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, response: action.response  };
    case API_CALL_FAILURE:
      return { ...state, fetching: false,  error: action.error };
    default:
      return state;
  }
}
