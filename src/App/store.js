import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux'


import {api_reduc} from '../reducers/api_reduc.js';
import {loadingOverlay} from '../reducers/loadingOverlay.js';


const sagaMiddleWare = createSagaMiddleware();

const rootReducer = combineReducers({
	api_reduc,loadingOverlay
})


export const configureStore = (initialState={}) =>{


 return {
 	store:
 	createStore(
   			rootReducer,
   			compose( applyMiddleware(sagaMiddleWare) )),

 				sagaMiddleWare: sagaMiddleWare,

	}
}
