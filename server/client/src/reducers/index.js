import { combineReducers } from 'redux';
import authReducer from './authReducer';
import petsReducer from './petsReducer';
import activePetReducer from './activePetReducer';
import filterReducer from './filterReducer';


export default combineReducers({
    auth: authReducer,
    pets: petsReducer,
    activepet :activePetReducer,
    filterpets:filterReducer,
   

});

