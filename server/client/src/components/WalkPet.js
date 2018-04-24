import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import Progress from './Progress';

export default function WalkPet({ walkPet, petId ,walkProgress}) {
console.log("walkpet + pet"+petId);
//const FeedPet = ({ feedPet }) => {

    return(
            <button id="favourite_btn" className="btn-floating  pulse waves-effect waves-light #d1c4e9 grey lighten-3"
            style={{ margin: '5px' }}
            onClick={() => walkPet(petId)}>
                <i className="material-icons black600" id="walk_icon">directions_walk</i>
            </button>

    );

    
}

