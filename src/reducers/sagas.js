import { takeLatest, call, put } from "redux-saga/effects";

import { decompose_show} from "./helpers.js";

import axios from "axios";



// function that makes the api request and returns a Promise for response
const apiFetchCall = (url,data,config) => axios({method: config.method, headers: config.headers, url: url, data: data}).then( (response) =>  {console.log("sucessfull call to to API SAGA");
return response});

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest("API_CALL_REQUEST", workerSaga);


}




// worker saga: makes the api call when watcher saga sees the action
function* workerSaga(action) {
  try {


    const response = yield call(apiFetchCall, action.url, action.data, action.config);
    console.log("here is the response data", response);




    console.log("checking workerSaga", response);


    yield put({ type: "API_CALL_SUCCESS", response});

    if(response.data.Code === 200){

      switch(action.url){
      case 'http://myjobtank.com:8087/login':
          
    }
  }





  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log("checking error", error);
    yield put({ type: "API_CALL_FAILURE",  error });
  }
}
