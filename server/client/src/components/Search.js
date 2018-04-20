import React, { Component } from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../css/style.css';
import { fetchAllPets } from '../actions';
import PetListSearch from './PetListSearch';

import {connect} from 'react-redux';
import * as actions  from '../actions';

class Search extends Component {

    constructor(props) {
        super(props);
       
        this.state = {
            type: -1
            
          };
          console.log("Serach constructor"+this.state.type);
      }

    onChange = (selected)=> {
       
        
        this.setState({
            type: selected,
            
          });
          //console.log("onChange"+this.state.type);
          console.log("onChange selected"+selected);
        
      };
     

    render(){
        return (
         
              
            <div> 
            <RadioGroup onChange={ this.onChange } horizontal>
            <RadioButton value="1">
              Cat
            </RadioButton>
            <RadioButton value="0" >
              Dog
            </RadioButton>
           
          </RadioGroup>

        <div >
        <PetListSearch
            type={this.state.type}
            
          />    
        </div>
          </div>     
            
          );
    }


}

export default connect(null,actions) (Search);