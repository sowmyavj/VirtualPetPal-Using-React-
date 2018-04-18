import { combineReducers } from 'redux';
import authReducer from './authReducer';
import petsReducer from './petsReducer';
import activePetReducer from './activePetReducer';

export default combineReducers({
    auth: authReducer,
    pets: petsReducer,
    activepet :activePetReducer

});

