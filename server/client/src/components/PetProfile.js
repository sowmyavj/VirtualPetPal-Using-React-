import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePet,fetchUserPet } from '../actions';
import { feedPet, petMyPet, walkPet } from "../actions";

import '../css/style.css';
import { Link } from 'react-router-dom';
import FeedPet from './FeedPet';
import PetMyPet from './PetMyPet';
import WalkPet from './WalkPet';

class PetProfile extends Component {
    componentDidMount() {
        const { petId } = this.props.match.params;
        console.log("PetId:" + petId);
        console.log("type:" + typeof (petId));

        this.props.fetchSinglePet(petId);
        this.props.fetchUserPet(petId);

    }

    renderSinglePet() {
        if(this.props.activepet.userspet){
            console.log("progresss" + this.props.activepet.noOfTimesToPet+" "+this.props.activeUserPet.noOfTimesPetted);

        }
        if (this.props.activepet) {
                return (
                    <div className="col m4">
                        <div className="col" id="petCard">
                            <div className="card">
                                <div className="card-image">
                                    <img src={window.location.origin + '/images/' + this.props.activepet.profilephotoLink} height="286" width="250" />
                                    <span className="card-title black">{this.props.activepet.name}</span>
                                </div>
                                <div className="card-content">
                                    <p>{this.props.activepet.description}</p>
                                    
                                      {this.props.activepet.userspet == true &&
                                      <div>
                                            <PetMyPet petMyPet={this.props.petMyPet} petId={this.props.activepet.pet_id}
                                            petProgress={this.props.activeUserPet.petProgress}/>
                                            <br/>
                                            <WalkPet walkPet={this.props.walkPet} petId={this.props.activepet.pet_id}
                                            walkProgress={this.props.activeUserPet.walkProgress}/>
                                            <br/>
                                            <FeedPet feedPet={this.props.feedPet} petId={this.props.activepet.pet_id}
                                            feedProgress={this.props.activeUserPet.feedProgress}/>
                                        </div>
                                      }
                                       {this.props.activepet.userspet == false &&
                                            <span>
                                             <Link to="/pet" className="btn-floating  waves-effect waves-light ">
                                             <i className="material-icons black">add</i>
                                         </Link>                                         
                                         </span>
                                      }
                                   
                                </div>
                                <form action="#">
                                    <p className="range-field">
                                        <span>
    
                                            <input type="range" id="test5" min="0" max="100" value={this.props.activeUserPet.happinessLevel ? this.props.activeUserPet.happinessLevel :0} disabled color="blue" />
                                            <br /><br /><br />
                                            <button className="btn-floating btn-large waves-effect halfway-fab waves-light green" >
                                                <i className="material-icons">mood</i>
                                            </button>
                                            <button className="fab-button btn-floating btn-large waves-effect halfway-fab waves-light #90caf9 red lighten-2" >
                                                <i className="material-icons">mood_bad</i>
                                            </button>
                                        </span>
                                    </p>
    
                                </form>
                            </div>
                        </div>
                    </div>
                );
            
            
        }
    }
    render() {
        //const { pet } = this.props;
        console.log("this.props" + JSON.stringify(this.props.activeUserPet));

        return (
            <div>
                <div className="row" >
                    {this.renderSinglePet()}
                </div>
            </div>
        );
    }

}


function mapStateToProps({ activepet,activeUserPet }) {
    console.log("Inside petprofile mapstatetoprops "+JSON.stringify(activepet));
    console.log("Inside petprofile mapstatetoprops activeUserPet "+JSON.stringify(activeUserPet));

    return { activepet : activepet,
        activeUserPet : activeUserPet        
    };
}

/* function mapStateToProps({ pets }, ownProps) {
    console.log("own"+ownProps.match.params.name);
    return { pet: pets[ownProps.match.params.name] };
  } */
//export default connect(mapStateToProps, { fetchSinglePet,fetchUserPet, feedPet, petMyPet, walkPet })(PetProfile);
export default connect(mapStateToProps,{fetchSinglePet,fetchUserPet, feedPet, petMyPet, walkPet})(PetProfile);