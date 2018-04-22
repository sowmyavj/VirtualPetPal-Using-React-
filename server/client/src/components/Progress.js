import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserPet,petMyPet,walkPet,feedPet } from "../actions";

import { Link } from 'react-router-dom';

//export default function Progress({ calcProgress, progressValue }) {
class  Progress extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    //const { petId } = this.props.match.params;
    //this.props.fetchUserPet(petId);


  }
  render(){
      const {petAction, feedprogress,petprogress, walkprogress } = this.props;
      const currentProgress = (petAction == "Feed") ? feedprogress: (petAction == "Pet" ? petprogress : walkprogress);
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

  /* const mapDispatchToProps = dispatch => {
      console.log("mapDispatchToProps");
    return {
      onPetAction: (pet_id) => {
        dispatch(fetchUserPet(pet_id));
      }
    };
  }; */
Progress = connect(mapStateToProps,{fetchUserPet})(Progress);

export default Progress;
