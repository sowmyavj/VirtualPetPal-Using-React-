import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkout,getNoOfUserGoodies } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import Cart from '../components/Cart'
import Goodies from './Goodies'

const CartContainer = ({ products, total, checkout, noOfgoodies }) => {
  return(
    <div>
     <Cart
    products={products}
    total={total}
    onCheckoutClicked={() => checkout(products)} /> 
    </div>
  )

}
 
CartContainer.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  })).isRequired,
  total: PropTypes.string,
  checkout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    console.log("CartContainer state"+JSON.stringify(state));

  return {
    products: getCartProducts(state),
    total: getTotal(state) 
    };

}
/* const mapStateToProps = (state) => (
  {products: getCartProducts(state),
    total: getTotal(state)
  
}) */

export default connect(
  mapStateToProps,
  { checkout }
)(CartContainer)
