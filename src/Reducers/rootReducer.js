import algoReducer from './algoReducer';
import nodeReducer from './nodeReducer';
import { combineReducers } from 'redux';

export default combineReducers({ 
  algorithm: algoReducer,
  nodes: nodeReducer
});