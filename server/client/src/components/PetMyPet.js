import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import Progress from './Progress';

export default function PetMyPet({ petMyPet, petId, petProgress }) {
console.log("feedpet + pet"+petId);
//const FeedPet = ({ feedPet }) => {

    return(
            <button id="favourite_btn" className="btn-floating  pulse waves-effect waves-light grey lighten-3"
            style={{ margin: '5px' }}
            onClick={() => petMyPet(petId)}>
                <i className="material-icons red600" id="favourite_icon"  >favorite</i>
            </button>
    );

    
}

