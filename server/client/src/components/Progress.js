import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserPet } from "../actions";

import { Link } from 'react-router-dom';

//export default function Progress({ calcProgress, progressValue }) {
class  Progress extends Component {
//const FeedPet = ({ feedPet }) => {
    render(){
      const p = this.props;
      const currentProgress = (p.petAction == "Feed") ? p.feedprogress: (p.petAction == "Pet" ? p.petprogress : p.walkprogress);
        return(
            <progress value={currentProgress} max="100">70 %</progress>
  );

    }
   
}

const mapStateToProps = state => {
    console.log("Progress state"+JSON.stringify(state));
    return {
      feedprogress: state.activeUserPet.feedProgress,
      petprogress: state.activeUserPet.petProgress,
      walkprogress: state.activeUserPet.walkProgress

      
    };
  };
  const mapDispatchToProps = dispatch => {
      console.log("mapDispatchToProps");
    return {
      onPetAction: (pet_id) => {
        dispatch(fetchUserPet(pet_id));
      }
    };
  };
Progress = connect(mapStateToProps,mapDispatchToProps)(Progress);

export default Progress;
