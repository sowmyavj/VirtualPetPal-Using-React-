import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserPet, petMyPet, walkPet, feedPet } from "../actions";

import { Link } from 'react-router-dom';

class Progress extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { petAction, feedprogress, petprogress, walkprogress } = this.props;
    const currentProgress = (petAction == "Feed") ? feedprogress : (petAction == "Pet" ? petprogress : walkprogress);
    return (
      <progress value={currentProgress} max="100">70 %</progress>
    );

  }

}

const mapStateToProps = state => {
  //console.log("Progress state"+JSON.stringify(state));
  return {
    feedprogress: state.activeUserPet.feedProgress,
    petprogress: state.activeUserPet.petProgress,
    walkprogress: state.activeUserPet.walkProgress


  };
};

Progress = connect(mapStateToProps, { fetchUserPet })(Progress);

export default Progress;
