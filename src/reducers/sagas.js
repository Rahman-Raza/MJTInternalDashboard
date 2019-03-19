import { takeLatest, call, put } from "redux-saga/effects";

import { decompose_show} from "./helpers.js";

// function that makes the api request and returns a Promise for response
const apiFetchCall = (url) => fetch(url).then(response => response.json())

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);


}




// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  try {


    const response = yield call(apiFetchCall, action.payload);
    console.log("here is the response data", response);


    let decomposition = response._embedded.episodes ? decompose_show(response._embedded.episodes) : {};
    
    let seasonCount = decomposition.seasonCount ? decomposition.seasonCount : 0;
    
    let seasons = decomposition.seasons ? decomposition.seasons : [];

    let tvShow = {
      title: 'something',
      summary: 'another thing',
      imgURL: 'url here',


    }

    console.log("checking workerSaga", response);



    // dispatch a success action to the store with the new tvShow Data
    yield put({ type: "API_CALL_SUCCESS", tvShow, seasonCount });
    yield put({ type: "ADD_SEASONS", seasons });
    
    let seasonNumber = 1;
    yield put({ type: "DISPLAY_SEASON", seasonNumber });

    //
   


  
  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log("checking error", error);
    yield put({ type: "API_CALL_FAILURE",  error });
  }
}