import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Icon} from 'semantic-ui-react'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import requestmanager from '../../lib/requestmanager';
import {store} from 'react-notifications-component';

class StatisticPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render(){
    return (
      <div className='mm-list-centered'>
        <Card className='card-center'>
          <div className='float-right'>
            <a className='corner-close' href='/'>
              <Icon name='close'/>
            </a>
          </div>
          <div className='small-padding'>
            <h3>GAME STATISTIC</h3>
          </div>
          <div className='vertical-align'>
            <div>
              <h3 className='margin-bottom-zero'> Your killers </h3>
              <hr style={{width: "150px"}} />
            </div>
            <div>
              <h3 className='margin-bottom-zero'> You killed </h3>
              <hr style={{width: "150px"}} />
            </div>
            <Link to='/'>
              <Button id="mm-btn-green" style={{marginBottom: "25px"}}>BACK TO MAIN MENU</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }
}

export default StatisticPage
