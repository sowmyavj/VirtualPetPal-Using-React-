import React,{ Component } from 'react';
import { BrowserRouter, Route}  from 'react-router-dom';

import {connect} from 'react-redux';
import * as actions  from '../actions';

import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Search from "./Search";
//const Header =() => <h2>Header </h2>;
//const Dashboard =() => <h2>Dashboard </h2>;
const SurveyNew =() => <h2>SurveyNew </h2>;

class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
        this.props.fetchAllPets();

    }
    render(){
        return(
            <div className="container-fluid">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route path="/surveys/new" component={SurveyNew}/>
                        <Route exact path="/search" component={Search}/>
    
                    </div>
                </BrowserRouter>
            </div>
        );
    }
    
};

export default connect(null,actions) (App);