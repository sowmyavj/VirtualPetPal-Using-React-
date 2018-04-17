import { combineReducers } from 'redux';
import authReducer from './authReducer';
import petsReducer from './petsReducer';

export default combineReducers({
    auth: authReducer,
    pets: petsReducer

});

