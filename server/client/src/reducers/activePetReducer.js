import { FETCH_SINGLE_PET } from '../actions/types';


export default function(state = [], action){
    console.log("FETCH_SINGLE_PET  "+action);
    switch(action.type){
        case FETCH_SINGLE_PET:
            return action.payload ;
        default: 
            return state;
    }
}