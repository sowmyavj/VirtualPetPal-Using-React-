import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePet } from '../actions';
import '../css/style.css';
import { Link } from 'react-router-dom';


class PetProfile extends Component {
    componentDidMount() {
        const { name } = this.props.match.params;
        console.log("NNNName:"+name);  
        console.log("type:"+typeof(name));  

        this.props.fetchSinglePet(name);
    }

    renderSinglePet() {
         if (this.props.activepet) {

            return (
                <div className="col m4">

        <div className="col" id="petCard">

          <div className="card">
            <div className="card-image">
             <img src={window.location.origin + '/images/'+ this.props.activepet.profilephotoLink} /> 
              <span className="card-title black">{this.props.activepet.name}</span>
              <Link to="/pet" className="btn-floating halfway-fab waves-effect waves-light black">
                <i className="material-icons">add</i>
              </Link>
            </div>
            <div className="card-content">  
              <p>{this.props.activepet.description}</p>
              
            </div>
          </div>
        </div>
      </div>
        
            );
        }
    }
render() {
    //const { pet } = this.props;
    console.log("this.props"+this.props.activepet);
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