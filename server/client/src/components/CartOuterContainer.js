import React from 'react'
import { connect } from 'react-redux'

import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import Goodies from './Goodies'
import { getNoOfUserGoodies } from '../actions';

  class CartOuterContainer extends Component {
    constructor(props) {
      super(props);
     
    }
    componentDidMount() {
      console.log("cart outer component did mount start");
      this.props.getNoOfUserGoodies();
      console.log("component did mount end");
  }
  render(){
  return (
    <div>
   <ReactTooltip />
    <ProductsContainer />
    <hr/>
    <Goodies noOfgoodies={this.props.noOfgoodies}/>
    <CartContainer />
  </div>
  )
}}
function mapStateToProps({ userGoodies }) {
  return { noOfgoodies : userGoodies.quantity
  };
}

//export default CartOuterContainer
export default connect(mapStateToProps,{getNoOfUserGoodies})(CartOuterContainer);