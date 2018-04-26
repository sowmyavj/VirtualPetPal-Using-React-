import React from 'react'
import PropTypes from 'prop-types'
import CartItem from './CartItem'

const Cart  = ({ products, total, onCheckoutClicked }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
      <CartItem
        title={product.title}
        price={product.price}
        quantity={product.quantity}
        key={product.id}
        image={product.image}
      />
    )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
      <h3>Your Cart</h3>
      <div class="row">{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button className="btn-floating black " onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
          <i className="material-icons black" id="shopping_cart"  >shopping_cart</i>
      </button>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}

export default Cart
