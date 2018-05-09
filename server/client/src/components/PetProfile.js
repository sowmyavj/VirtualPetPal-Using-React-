import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePet,fetchUserPet, getNoOfUserGoodies } from '../actions';
import { addPet, feedPet, petMyPet, walkPet, useGoodies } from "../actions";

import '../css/style.css';
import { Link } from 'react-router-dom';
import FeedPet from './FeedPet';
import PetMyPet from './PetMyPet';
import WalkPet from './WalkPet';
import Progress from './Progress';
import TimingSpinner from './TimingSpinner';
import UseGoodies from './UseGoodies';
import ReactTooltip from 'react-tooltip'




class PetProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true, // will be true when pet, walk,feed is running
        }
      }
    componentDidMount() {
        console.log("component did mount start");
        const { petId } = this.props.match.params;
        console.log("PetId:" + petId);
        console.log("type:" + typeof (petId));

        this.props.fetchSinglePet(petId);
        this.props.fetchUserPet(petId);
        this.props.getNoOfUserGoodies();
        console.log("component did mount end");

    }
    componentDidUpdate() {
        if(this.state.loading == true){
            console.log("activeUserPet active");
        }
    }

    renderSinglePet(activeUserPet, showActions, showUseGoodies, isHappinessLevelFullfilled) {
       console.log("isHappinessLevelFullfilled"+isHappinessLevelFullfilled)
       
        if (this.props.activepet) {
            console.log("Active pet is");
            //console.log(activeUserPet);
            console.log(this.props.activepet);
                return (
                    <div className="col m4">
                        <div className="col" id="petCard">
                            <div className="card">
                                <div className="card-image">
                                    <img src={window.location.origin + '/images/' + this.props.activepet.profilephotoLink+".jpg"} height="286" width="250" 
                                    alt="pet profile picture"/>
                                    <span className="card-title black">{this.props.activepet.name}</span>
                                    {this.props.activepet.userspet == false && !showActions &&
                                            <span>
                                            <ReactTooltip />
                                             <button onClick={() => this.props.addPet(this.props.activepet.pet_id)} 
                                                 className="btn-floating halfway-fab waves-effect waves-light ">
                                             <i className="material-icons black" data-tip="AddPet">add</i>
                                         </button>                                         
                                         </span>
                                      }
                                </div>
                                <div className="card-content">
                                    <p>{this.props.activepet.description}</p>
                                    
                                      {(this.props.activepet.userspet == true || showActions) &&
                                      <div>
                                            <PetMyPet petMyPet={this.props.petMyPet} petId={this.props.activepet.pet_id}
                                            petProgress={activeUserPet.petProgress}/>
                                            <Progress progress={activeUserPet.petProgress} petAction={"Pet"}/>
                                            <br/>
                                            <WalkPet walkPet={this.props.walkPet} petId={this.props.activepet.pet_id}
                                            walkProgress={activeUserPet.walkProgress}/>
                                            <Progress progress={activeUserPet.walkProgress} petAction={"Walk"}/>

                                            <br/>
                                            <FeedPet feedPet={this.props.feedPet} petId={this.props.activepet.pet_id}
                                            feedProgress={activeUserPet.feedProgress}/>
                                            <Progress progress={activeUserPet.petProgress} petAction={"Feed"}/>

                                        </div>
                                      }
                                      {(showActions && showUseGoodies) &&
                                        <UseGoodies useGoodies={this.props.useGoodies}
                                        petId={this.props.activepet.pet_id}
                                        isHappinessLevelFullfilled={isHappinessLevelFullfilled}/>
                                      }
        
                                   
                                </div>
                                {(this.props.activepet.userspet == true || showActions) &&
                                        <span>
                                        <button className="btn-floating btn-large   waves-light #90caf9 red lighten-2"  color="red lighten-2" >
                                                <i className="material-icons">mood_bad</i>
                                            </button>
                                            <input type="range" className="range-field" min="0" max={this.props.activepet.noOfTimesToFeed +this.props.activepet.noOfTimesToWalk+this.props.activepet.noOfTimesToPet}
                                                 value={activeUserPet.happinessLevel ? activeUserPet.happinessLevel :0} disabled color="blue" style={{ width: '70%' }}/>
                                            
                                            <button className="fab-button btn-floating btn-large green darken-2" >
                                                <i className="material-icons">mood</i>
                                            </button>
                                        </span>
                                }
    
                            </div>
                        </div>
                    </div>
                );
            
            
        }
    }
    render() {
        if(this.state.loading){
            console.log("display loading");
            // return(
            //     <TimingSpinner /> 
            // )
        }
        const { activeUserPet, userGoodies, activepet} = this.props;
       // console.log(props);
       let showActions = false;
       let showUseGoodies = false;
       let isHappinessLevelFullfilled = false;
        //console.log("activepet999"+JSON.stringify(activepet));
        if(Object.keys(activeUserPet).length > 0){
            this.state.loading=true;
            showActions= true;
            if(activeUserPet.happinessLevel===(activepet.noOfTimesToFeed+activepet.noOfTimesToWalk+activepet.noOfTimesToPet ))
            {
                isHappinessLevelFullfilled=true;
            }
        }
        if(Object.keys(userGoodies).length > 0){
            this.state.loading=true;
            showUseGoodies= true;
        }
        //console.log("this.props" + JSON.stringify(this.props.activeUserPet));
        //console.log("this.props" + JSON.stringify(this.props.addPet));
        //console.log("this.props" + JSON.stringify(this.props.feedPet));

        return (
            <div>
                <div className="row" >
                    {this.renderSinglePet(activeUserPet, showActions, showUseGoodies, isHappinessLevelFullfilled)}
                </div>
            </div>
        );
    }

}


function mapStateToProps({ activepet,activeUserPet, userGoodies }) {
    //console.log("Inside petprofile mapstatetoprops userGoodies "+JSON.stringify(userGoodies));
    console.log("Inside petprofile mapstatetoprops activeUserPet "+JSON.stringify(activeUserPet));
    //console.log("Inside petprofile mapstatetoprops activeUserPet length "+Object.keys(activeUserPet).length);
    //console.log("Inside petprofile mapstatetoprops activeUserPet typeof "+typeof(activeUserPet));

    return { activepet : activepet,
        activeUserPet : activeUserPet,
        userGoodies :   userGoodies     
    };
}

/* function mapStateToProps({ pets }, ownProps) {
    console.log("own"+ownProps.match.params.name);
    return { pet: pets[ownProps.match.params.name] };
  } */
//export default connect(mapStateToProps, { fetchSinglePet,fetchUserPet, feedPet, petMyPet, walkPet })(PetProfile);
export default connect(mapStateToProps,{fetchSinglePet,fetchUserPet, feedPet, petMyPet, walkPet, addPet, getNoOfUserGoodies,
    useGoodies})(PetProfile);