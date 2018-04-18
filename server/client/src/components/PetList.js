import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPets } from '../actions';
import '../css/style.css';
import { Link } from 'react-router-dom';


class PetList extends Component {
    componentDidMount() {
        this.props.fetchAllPets();
    }

    renderPets() {
        return this.props.pets.reverse().map(pets => {
            return (
                <div className="col m4" key={pets._id}>

        <div className="col" id="petCard">

          <div className="card" key={pets._id}>
            <div className="card-image">
              <img src={window.location.origin + '/images/'+ pets.profilephotoLink} />
              <span className="card-title black">{pets.name}</span>
              <Link to={`/pet/${pets.name}`} className="btn-floating halfway-fab waves-effect waves-light black">
                <i className="material-icons">add</i>
              </Link>
            </div>
            <div className="card-content">  
              <p>{pets.description}</p>
              
            </div>
          </div>
        </div>
      </div>
        
            );
          });
    }
render() {
    return (
        <div>
        <div className="row" >

            {this.renderPets()}
        </div>
        </div>
    );
}

}


function mapStateToProps({ pets }) {
    return { pets };
}

export default connect(mapStateToProps, { fetchAllPets })(PetList);