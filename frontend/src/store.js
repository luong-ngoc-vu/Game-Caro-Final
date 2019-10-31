import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const middleWares = [thunk, logger];
export const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;