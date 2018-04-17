import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payment from'./Payment';
class Header extends Component {
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <li><a href='/auth/google'>Login with Google</a> </li>;
            default:
                return [
                <li key="1"><Payment /></li>,
                <li key="3" style={{margin: '0px 10px'}}>Credits: {this.props.auth.credits}</li>,

                <li key="2"><a href='/api/logout'>Logout</a> </li>
                ]
        }
    }
    render() {
        //console.log(this.props)
        return (<nav>
            <div className="nav-wrapper" id='pet_header'>
                <Link
                    to={this.props.auth ? '/dashboard' : '/'}
                    className="left brand-logo"
                 >
                    Virtual Pet Pal</Link>
                <ul className="right">
                    {this.renderContent()}
                </ul>

            </div>
        </nav>
        );
    };
}
function mapStateToProps(state){
    return { auth: state.auth}
}
export default connect(mapStateToProps)(Header);