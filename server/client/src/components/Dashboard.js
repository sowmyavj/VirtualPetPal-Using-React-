import React from 'react';
import { Link } from 'react-router-dom';
import PetList from './PetList';

const Dashboard = () => {
  return (
    <div>
      <br/>
      <br/>
      <PetList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large black">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;