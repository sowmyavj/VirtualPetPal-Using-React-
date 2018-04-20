import React,{Component} from 'react';
import Background from '../images/b2.jpg';
var backgroundstyle={
  width: "100%",
  height: "610px",
  backgroundImage: "url(" + Background + ")",
  backgroundSize: 'cover', overflow: 'hidden',
}

class Landing extends Component{
    
    render(){
        return(
        <div >
            <div  style={backgroundstyle} />

        <div className="centered col s12 m7">
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <p>Signup and experience the joy of caring for a furry friend</p>
            </div>
          </div>
        </div>
      </div>        
        </div>      
       
        );

    }


   
}

export default Landing;