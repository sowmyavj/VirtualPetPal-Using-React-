import React,{Component} from 'react';
import Background from '../images/b2.jpg';

class Landing extends Component{
    
    render(){
        return(
        <div >
            <img src={Background} alt="Norway" style={{width: '100%', height:'50%'}} />

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