import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getNoOfUserGoodies } from '../actions';

//import { getUserGoodies } from '../reducers/cart'

const Goodies = ({ noOfgoodies }) => (
  <div className="row" >
  <h3>Existing Pet Goodies:{noOfgoodies}</h3>
  </div>
)



  //export default connect(mapStateToProps,{getNoOfUserGoodies})(Goodies);
  export default  Goodies;