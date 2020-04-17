import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class TargetScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render(){
    return (
      <div className='mm-list'>
        <div className='setting-div'>
          <h1> KILLER </h1>
          <div className='image-label-center'>
            <h2> YOUR TARGET IS </h2>
            <h2 className='mini-text'> galulex@active-bridge.com </h2>
          </div>
          <div style={{marginBottom: "20px"}}>
            <img id='img-profile' src={this.state.image_URL} />
          </div>
          <br />
        </div>
        <div>
          <Link to='/'>
            <Button id="mm-btn-right-margin">BACK TO MENU</Button>
          </Link>
          <input
              id="mm-btn-red"
              style={{marginLeft: "25px"}}
              type="button"
              value="I WAS KILLED" />
        </div>
      </div>
    );
  }
}

export default TargetScreen;
