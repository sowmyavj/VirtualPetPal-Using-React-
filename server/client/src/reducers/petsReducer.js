import { FETCH_ALL_PETS } from '../actions/types';


export default function(state = [], action){
    //console.log("FETCH_ALL_PETS  "+action);
    switch(action.type){
        case FETCH_ALL_PETS: 
            return action.payload || false; //'' || false will be false
        default: 
            return state;
    }
}