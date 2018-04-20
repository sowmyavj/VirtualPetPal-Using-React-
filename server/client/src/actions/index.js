import axios from 'axios';
import { FETCH_USER, FETCH_ALL_PETS, FETCH_FILTER,FETCH_SINGLE_PET } from './types';

export const fetchUser = () => async (dispatch) => {
        //api request to backend server
       let res=await  axios.get('/api/current_user');
       dispatch({
            type: FETCH_USER,
            payload: res.data
        }); 
    };

export const handleToken = (token) => async (dispatch) => {
        //api request to backend server
       const res = await axios.post('/api/stripe',token);
       dispatch({
        type: FETCH_USER,
        payload: res.data
        }); 
    };


export const fetchAllPets = () => async (dispatch) => {
        //api request to backend server
        console.log("fetchAllPets");
       let res=await  axios.get('/api/dashboard');
       dispatch({
            type: FETCH_ALL_PETS,
            payload: res.data
        }); 
    };

    export const fetchFilter = (type) => async (dispatch) => {
        //api request to backend server
        console.log("fetchFilter " +type);
       let res=await  axios.get(`/api/type/${type}`);
       console.log("fetchFilter");
       console.log(res);
       dispatch({
            type: FETCH_FILTER,
            payload: res.data
        }); 
    };

    
export const fetchSinglePet = (petId) => async (dispatch) => {
        //api request to backend server
        console.log("fetchSinglePet"+ petId);
        const res = await axios.get(`/api/pet/${petId}`);
        //console.log("fetchSinglePet222"+res);

        dispatch ({
          type: FETCH_SINGLE_PET,
          payload: res.data
        });
       
    };