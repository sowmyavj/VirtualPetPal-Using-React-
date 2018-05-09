import React from 'react'
import PropTypes from 'prop-types'

//import { getUserGoodies } from '../reducers/cart'

const Goodies = ({ noOfgoodies }) => (
  <div className="row" >
  <h2>Existing Pet Goodies:{noOfgoodies}</h2>
  </div>
)



  //export default connect(mapStateToProps,{getNoOfUserGoodies})(Goodies);
  export default  Goodies;