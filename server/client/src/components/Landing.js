import React, { Component } from 'react';
import Background from '../images/b2.jpg';
import '../css/style.css';

var backgroundstyle = {
  width: "100%",
  height: "610px",
  backgroundImage: "url(" + Background + ")",
  backgroundSize: 'cover', overflow: 'hidden',
}

class Landing extends Component {

  render() {
    return (
      <div >
        <div className="parallax">
        </div>
        <div></div>
        <div className="caption">
          <span className="border">Signup and experience the joy of caring for a furry friend.</span>
        </div>
        <div className="parallax">
        </div>

      </div>

    );

  }



}

export default Landing;