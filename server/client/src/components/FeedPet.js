import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import Progress from './Progress';
export default function FeedPet({ feedPet, petId, feedProgress }) {
//console.log("feedpet + pet"+petId);
//const FeedPet = ({ feedPet }) => {
    console.log("feedpet + feedProgress"+feedProgress);

    return(
            <button id="favourite_btn" className="btn-floating  pulse waves-effect waves-light #fff9c4 yellow lighten-2"
            style={{ margin: '5px' }}
            onClick={() => feedPet(petId)}>
                <i className="material-icons green600" id="local_dining">local_dining</i>

            </button>

    );

    
}

