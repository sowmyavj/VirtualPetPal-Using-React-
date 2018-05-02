import axios from 'axios';
import shop from '../api/shop'
import { FETCH_USER, FETCH_ALL_PETS, FETCH_FILTER,FETCH_SINGLE_PET,FETCH_USER_PET, PET_MY_PET, FEED_PET, WALK_PET } from './types';
import { ADD_TO_CART, CHECKOUT_REQUEST, CHECKOUT_SUCCESS,CHECKOUT_FAILURE,RECEIVE_PRODUCTS} from './types';
import { SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION } from 'constants';


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
    
    console.log("checkout called");
    
    let total=0
    for (var i = 0; i < products.length; i++) { 
      let price=products[i].price;
      let q=products[i].quantity;
      total+=(q*price);
      
      console.log(price);
      console.log(q);
  }
  var config = {
    'products': products ,
    'total':total,
    'credits':state.auth.credits
   };

    let res=await  axios.post('/api/addgoodies',config);

    const { cart } = getState()
    console.log("result is")
    console.log(res)

    let state=getState();

    console.log(state.auth.credits);
    console.log(state);
    console.log(products);
    
    if(res.data.error)
    {
      console.log("cannot do checkout now")
      shop.buyProducts(products, () => {
        
        dispatch({
          type: CHECKOUT_FAILURE,
          cart
        })
       
      })
    }
    else{
      console.log("can do checkout now")
      dispatch({
        type:CHECKOUT_REQUEST
      })
      shop.buyProducts(products, () => {
        dispatch({
          type: CHECKOUT_SUCCESS,
          cart
        })
        // Replace the line above with line below to rollback on failure:
        // dispatch({ type: types.CHECKOUT_FAILURE, cart })
      })
    }
  
   
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
        console.log("fetchUserPet"+ petId);
        const res = await axios.get(`/api/userpet/${petId}`);
        console.log("fetchUserPet222"+res);

        dispatch ({
          type: FETCH_USER_PET,
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