import React,{ Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import PetList from './PetList';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Dashboard extends Component {
  componentDidMount(){
    console.log("Dashboard");
    //this.createNotification('success')()
    setTimeout(this.createNotification('info'), 3000);
  }
  createNotification = type => () => {
    console.log("createNotification");

    switch (type) {
      case 'info':
        NotificationManager.info('Time to feed your Pet');
        break;
      case 'success':
        NotificationManager.success('Success message', 'Title here');
        break;
      case 'warning':
        NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
        break;
      case 'error':
        NotificationManager.error('Error message', 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
      default:
        break;
    }
  };
//const Dashboard = () => {
  render(){
    return (
    
      <div>
        <br/>
        <br/>
       {/*  <button className="btn btn-info" onClick={this.createNotification('info')}>
            Info
          </button> */}
          <NotificationContainer/>

        <PetList />
        <div className="fixed-action-btn">
        </div>
      </div>
    );
  }
  

}

export default Dashboard;