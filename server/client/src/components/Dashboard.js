import React,{ Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import PetList from './PetList';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class Dashboard extends Component {
  componentDidMount(){
    var d = new Date();
    var n = d.getHours();
    console.log("Dashboard"+n);

    console.log("Dashboard"+new Date().toLocaleString());
    //this.createNotification('success')()
    let message='Time to Pet your Pets';
    //n=18;
    if(n >= 9 && n <= 11 || n >= 14 && n <= 16 || n > 20 && n <= 22  ){
      message='Time to Feed your Pets';
    }else if(n >= 18  && n <= 20 ){
      message='Time to Walk your Pets';

    }
    setTimeout(this.createNotification('info',message), 3000);
  }
  createNotification = (type,message) => () => {
    console.log("createNotification");

    switch (type) {
      case 'info':
        NotificationManager.info(message);
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