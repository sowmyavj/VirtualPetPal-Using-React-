import React from 'react'
import PropTypes from 'prop-types'

const ProductsList = ({ title, children }) => (
  <div className="row" >
    <h3>{title}</h3>
    <div>{children}</div>
  </div>
)

ProductsList.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

export default ProductsList
