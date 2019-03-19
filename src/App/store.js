import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux'


import {authentication} from '../reducers/authentication.js';
import {loadingOverlay} from '../reducers/loadingOverlay.js';


const sagaMiddleWare = createSagaMiddleware();

const rootReducer = combineReducers({
	authentication,loadingOverlay
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