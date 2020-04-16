import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon } from 'semantic-ui-react'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import requestmanager from '../../lib/requestmanager';

class TargetScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
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
            <img src={this.state.image_URL} id='img-profile' />
          </div>
          <br/>
        </div>
        <div>
          <Link to='/'>
            <Button id="mm-btn-right-margin">BACK TO MENU</Button>
          </Link>
          <input
            id="mm-btn-red"
            type="button"
            style={{marginLeft: "25px"}}
            value="I WAS KILLED" />
        </div>
      </div>
    )
  }
}

export default TargetScreen
