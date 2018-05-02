import React from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import { Component } from 'react';
import ReactTooltip from 'react-tooltip'

  class CartOuterContainer extends Component {
    render(){
  return (
    <div>
   
   <ReactTooltip />
    <ProductsContainer />
    <hr/>
    <CartContainer />
  </div>
  )
}}


export default CartOuterContainer
