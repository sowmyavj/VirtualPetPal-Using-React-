import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePet } from '../actions';
import '../css/style.css';
import { Link } from 'react-router-dom';


class PetProfile extends Component {
    componentDidMount() {
        const { petId } = this.props.match.params;
        console.log("PetId:" + petId);
        console.log("type:" + typeof (petId));

        this.props.fetchSinglePet(petId);
    }

    renderSinglePet() {
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
                                            <Link to="/pet" id="favourite_btn" className="btn-floating  waves-effect waves-light #f5f5f5 grey lighten-4"
                                             style={{ margin: '5px' }}>
                                             <i className="material-icons red600" id="favourite_icon"  >favorite</i>
    
                                            </Link>
                                            <progress value="70" max="100">70 %</progress>
                                            <br/>
                                            <Link to="/pet" className="btn-floating  waves-effect waves-light #f5f5f5 grey lighten-4" style={{ margin: '5px' }}>
                                                <i className="material-icons black600" id="walk_icon">directions_walk</i>
                                            </Link>
                                            <progress value="70" max="100">70 %</progress>
                                            <br/>
                                            <Link to="/pet" className="btn-floating  waves-effect waves-light #f5f5f5 grey lighten-4" style={{ margin: '5px' }}>
                                             <i className="material-icons green600" id="local_dining">local_dining</i>
                                            </Link>
                                            <progress value="70" max="100">70 %</progress>

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
    
                                            <input type="range" id="test5" min="0" max="100" value="10" disabled color="blue" />
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
        console.log("this.props" + this.props.activepet);
        return (
            <div>
                <div className="row" >
                    {this.renderSinglePet()}
                </div>
            </div>
        );
    }

}


function mapStateToProps({ activepet }) {
    return { activepet };
}

/* function mapStateToProps({ pets }, ownProps) {
    console.log("own"+ownProps.match.params.name);
    return { pet: pets[ownProps.match.params.name] };
  } */
export default connect(mapStateToProps, { fetchSinglePet })(PetProfile);