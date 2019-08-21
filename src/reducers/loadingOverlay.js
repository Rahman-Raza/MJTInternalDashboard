// action types
const LOADING_TRUE = "LOADING_TRUE";
const LOADING_FALSE = "LOADING_FALSE";





// reducer with initial state
const initialState = {
  loading: false,
  loadingMessage: "Loading Data...",
  
};

export  const loadingOverlay = (state = initialState, action) =>{
  switch (action.type) {
    case LOADING_TRUE:
      return { ...state, loading: true, loadingMessage: action.payload};
    case LOADING_FALSE:
      return { ...state, loading: false, loadingMessage: 'Loading Data...'};
    default:
      return state;
  }
}