import React,{ Component } from 'react';
import { BrowserRouter, Route}  from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions  from '../actions';

import Header from './Header';
import Footer from './Footer';

import Dashboard from './Dashboard';
import Landing from './Landing';
import Search from "./Search";
import PetProfile from './PetProfile';

//const Header =() => <h2>Header </h2>;
//const Dashboard =() => <h2>Dashboard </h2>;
//const SurveyNew =() => <h2>SurveyNew </h2>;

class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
        //this.props.fetchAllPets();

    }
    render(){
        return(
            <div className="container-fluid">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route exact path="/search" component={Search}/>
                        <Route exact path="/pet/:petId" component={PetProfile}/>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
    
};

export default connect(null,actions) (App);