import React, { Component } from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import '../css/style.css';
import { fetchDogs } from '../actions';
import { fetchCats } from '../actions';
import { fetchAllPets } from '../actions';


import {connect} from 'react-redux';
import * as actions  from '../actions';

class Search extends Component {

    constructor(props) {
        super(props);
        this.pets = props
        alert("this.pets :"+this.pets);
      }

    onChange(event) {
       
        switch(event){
            case "Dog": alert(this.pets);;break;
            case "Cat": alert(this.pets);;break;
        }
        
      }

      componentDidMount() {
        
    }

    componentDidUpdate() {
        //alert("did change")
     }

     

    render(){
        return (
         
              
              
            <RadioGroup onChange={ this.onChange } horizontal>
            <RadioButton value="Cat" >
              Cat
            </RadioButton>
            <RadioButton value="Dog" >
              Dog
            </RadioButton>
           
          </RadioGroup>
               
            
          );
    }


}

export default connect(null,actions) (Search);