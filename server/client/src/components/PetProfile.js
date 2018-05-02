import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePet,fetchUserPet } from '../actions';
import { addPet, feedPet, petMyPet, walkPet } from "../actions";

import '../css/style.css';
import { Link } from 'react-router-dom';
import FeedPet from './FeedPet';
import PetMyPet from './PetMyPet';
import WalkPet from './WalkPet';
import Progress from './Progress';
import TimingSpinner from './TimingSpinner';




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
        console.log("component did mount end");

    }
    componentDidUpdate() {
        console.log("component did update start");
        if(this.state.loading == true){
            console.log("activeUserPet active");
        }
        console.log("component did update end");

    }

    renderSinglePet(activeUserPet, showActions) {
       
       
        if (this.props.activepet) {
            //console.log("Active pet is");
            //console.log(activeUserPet);
           // console.log(this.props.activepet);
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
                                       {this.props.activepet.userspet == false && !showActions &&
                                            <span>
                                             <button onClick={() => this.props.addPet(this.props.activepet.pet_id)} 
                                                 className="btn-floating  waves-effect waves-light ">
                                             <i className="material-icons black">add</i>
                                         </button>                                         
                                         </span>
                                      }
                                   
                                </div>
                                <form action="#">
                                    <p className="range-field">
                                        <span>
    
                                            <input type="range" id="test5" min="0" max={this.props.activepet.noOfTimesToFeed +this.props.activepet.noOfTimesToWalk+this.props.activepet.noOfTimesToPet}
                                                 value={activeUserPet.happinessLevel ? activeUserPet.happinessLevel :0} disabled color="blue" />
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
        if(this.state.loading){
            console.log("display loading");
            // return(
            //     <TimingSpinner /> 
            // )
        }
        const { activeUserPet } = this.props;
       // console.log(props);
       let showActions = false;
        //console.log("activeUserPet999"+JSON.stringify(activeUserPet));
        if(Object.keys(activeUserPet).length > 0){
            this.state.loading=true;
            showActions= true;
        }
        //console.log("this.props" + JSON.stringify(this.props.activeUserPet));
        //console.log("this.props" + JSON.stringify(this.props.addPet));
        //console.log("this.props" + JSON.stringify(this.props.feedPet));

        return (
            <div>
                <div className="row" >
                    {this.renderSinglePet(activeUserPet, showActions)}
                </div>
            </div>
        );
    }

}


function mapStateToProps({ activepet,activeUserPet }) {
    //console.log("Inside petprofile mapstatetoprops "+JSON.stringify(activepet));
    //console.log("Inside petprofile mapstatetoprops activeUserPet "+JSON.stringify(activeUserPet));
    //console.log("Inside petprofile mapstatetoprops activeUserPet length "+Object.keys(activeUserPet).length);
    //console.log("Inside petprofile mapstatetoprops activeUserPet typeof "+typeof(activeUserPet));

    return { activepet : activepet,
        activeUserPet : activeUserPet        
    };
}

/* function mapStateToProps({ pets }, ownProps) {
    console.log("own"+ownProps.match.params.name);
    return { pet: pets[ownProps.match.params.name] };
  } */
//export default connect(mapStateToProps, { fetchSinglePet,fetchUserPet, feedPet, petMyPet, walkPet })(PetProfile);
export default connect(mapStateToProps,{fetchSinglePet,fetchUserPet, feedPet, petMyPet, walkPet, addPet})(PetProfile);