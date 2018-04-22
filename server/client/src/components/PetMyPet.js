import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import Progress from './Progress';

export default function PetMyPet({ petMyPet, petId, petProgress }) {
console.log("feedpet + pet"+petId);
//const FeedPet = ({ feedPet }) => {

    return(
        <div>
            <button id="favourite_btn" className="btn-floating  waves-effect waves-light #f5f5f5 grey lighten-4"
            style={{ margin: '5px' }}
            onClick={() => petMyPet(petId)}>
                <i className="material-icons red600" id="favourite_icon"  >favorite</i>
            </button>
            <Progress progress={petProgress} petAction={"Pet"}/>
        </div>

    );

    
}

