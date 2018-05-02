import axios from 'axios';
import shop from '../api/shop'
import { FETCH_USER, FETCH_ALL_PETS, FETCH_FILTER,FETCH_SINGLE_PET,FETCH_USER_PET, PET_MY_PET, FEED_PET, WALK_PET } from './types';
import { ADD_TO_CART, CHECKOUT_REQUEST, CHECKOUT_SUCCESS,CHECKOUT_FAILURE,RECEIVE_PRODUCTS, GET_NO_OF_USER_GOODIES} from './types';


const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products
  })
  
 
  export const getAllProducts = () => dispatch => {
    shop.getProducts(products => {
      dispatch(receiveProducts(products))
    })
  }
  
  const addToCartUnsafe = productId => ({
    type: ADD_TO_CART,
    productId
  })
  
  export const addToCart = productId => async (dispatch, getState) => {
    if (getState().products.byId[productId].inventory > 0) {
      dispatch(addToCartUnsafe(productId))
    }
  }
  
  export const checkout = products => async (dispatch, getState) => {
    var config = {
     'products': products 
    };
    console.log("checkout called");
    console.log(getState());
    let res=await  axios.post('/api/addgoodies',config);
    const { cart } = getState()
  
   dispatch({
      type:CHECKOUT_REQUEST
    }) 
    shop.buyProducts(products, () => {
      dispatch({
        type: CHECKOUT_SUCCESS,
        payload: res.data
      })
      // Replace the line above with line below to rollback on failure:
      // dispatch({ type: types.CHECKOUT_FAILURE, cart })
    })
  }

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
export const fetchUserPet = (petId) => async (dispatch) => {
        //api request to backend server
        //console.log("fetchUserPet"+ petId);
        const res = await axios.get(`/api/userpet/${petId}`);
       // console.log("fetchUserPet"+res);

        dispatch ({
          type: FETCH_USER_PET,
          payload: res.data
        });
       
    };
export const getNoOfUserGoodies = () => async (dispatch) => {
      //api request to backend server
      console.log("getNoOfUserGoodies");
      const res = await axios.get(`/api/user/goodies`);
     console.log("getNoOfUserGoodies"+JSON.stringify(res));

      dispatch ({
        type: GET_NO_OF_USER_GOODIES,
        payload: res.data
      });
     
  };

export const feedPet = (petId) => async (dispatch) => {
        //api request to backend server
        console.log("feedPet"+ petId);
        const res = await axios.post(`/api/pet/feed/${petId}`);
        console.log("feedPet222"+JSON.stringify(res));

        dispatch ({
          type: FETCH_USER_PET,
          payload: res.data
        });
       
    };

export const petMyPet = (petId) => async (dispatch) => {
        //api request to backend server
        console.log("petMyPet"+ petId);
        const res = await axios.post(`/api/pet/pet/${petId}`);
        console.log("petMyPet222"+JSON.stringify(res));

        dispatch ({
          type: FETCH_USER_PET,
          payload: res.data
        });
       
    };
    
    export const walkPet = (petId) => async (dispatch) => {
        //api request to backend server
        console.log("walkPet"+ petId);
        const res = await axios.post(`/api/pet/walk/${petId}`);
        //console.log("fetchSinglePet222"+res);

        dispatch ({
          type: FETCH_USER_PET,
          payload: res.data
        });
       
    };

    export const addPet = (petId) => async (dispatch) => {
        //api request to backend server
        console.log("addPet"+ petId);
        const res = await axios.post(`/api/pet/add/${petId}`);
        //console.log("fetchSinglePet222"+res);

        dispatch ({
          type: FETCH_USER_PET,
          payload: res.data
        });
       
    };