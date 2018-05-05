import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFilter } from '../actions';
import '../css/style.css';
import { Link } from 'react-router-dom';

class PetListSearch extends Component {
  constructor(props) {
    super(props);

    
   
    console.log("PetListSearch constructor");
    console.log(this.props);
    this.state = {
      selected:this.props.type
    }
  }


  componentDidMount = async props => {
    //alert("component did mount");
    //alert(this.props);
    console.log("PetListSearch componentDidMount "+ this.props.type);
    
    if (this.props.type) {
     
      await this.props.fetchFilter(this.props.type);
     
    
  }else{
    console.log("PetListSearch componentDidMount default");
    //await this.props.fetchAllPets();
  }
  console.log(this.props);
    
  };

  componentWillReceiveProps= async props1 => {
    //alert("component did mount");
    //alert(this.props);
    console.log("Search page")
    console.log(this.props)
    console.log("PetListSearch componentWillReceiveProps:: "+ props1.type);
    console.log(this.props.pets);
    
    if (props1.type && this.state.selected!=props1.type) {
      
        // if(props1.type=== "Dog"){
        //   console.log("PetListSearch componentWillReceiveProps Dog");
          await this.props.fetchFilter(props1.type);
          this.setState({
            selected:props1.type
          });
        console.log("componentWillReceiveProps finish");
        console.log(this.props);
        console.log(this.state.selected);
    }

   
  };

  

  

  
  renderPets() {
    console.log("render pets");
    console.log(this.props);
    let x=[];
    if(this.props.petdogs){
      x=this.props.petdogs;
    }
    else if(this.props.petcats){
      x=this.props.petcats;
    }
    else{
      x=this.props.pets;
    }
    
    return this.props.filterpets.reverse().map(pets => {
        return (
            <div className="col m4" key={pets._id}>

    <div className="col" id="petCard">

      <div className="card" key={pets._id}>
        <div className="card-image">
          <img src={window.location.origin + '/images/'+ pets.profilephotoLink+".jpg"} height="286" width="250"/>
          <span className="card-title black">{pets.name}</span>
          <Link to={`/pet/${pets.pet_id}`} className="btn-floating halfway-fab waves-effect waves-light black">
            <i className="material-icons">search</i>
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
    console.log("render");
    if (!this.props.filterpets) {
      return <h5>Select a type</h5>;
    }
    return(
    <div>
        <div className="row" >
            
            {this.renderPets()}
        </div>
        </div>
    );
  }
}

function mapStateToProps({ filterpets }) {
  console.log("Pet List search state")
  console.log(this.state) 
  return { filterpets };
}





export default connect(mapStateToProps, { fetchFilter})(PetListSearch);

