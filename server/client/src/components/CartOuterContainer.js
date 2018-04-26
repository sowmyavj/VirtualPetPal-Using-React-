import React from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import { Component } from 'react';

  class CartOuterContainer extends Component {
    render(){
  return (
    <div>
   
   
    <ProductsContainer />
    <hr/>
    <CartContainer />
  </div>
  )
}}


export default CartOuterContainer
