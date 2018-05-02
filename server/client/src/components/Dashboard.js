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
      </div>
    </div>
  );
};

export default Dashboard;