import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon } from 'semantic-ui-react'
import requestmanager from '../../lib/requestmanager';
import {store} from 'react-notifications-component';

class JoinGameWithCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: [],
      errorMessage: ''
    }
  }

  updateCode = (code) => {
    this.setState({ code });
  }

  findGameByCode = () => {
    const params = { game: { code: this.state.code }};
    const url = '/api/v1/players';
    requestmanager.request(url, 'post', params).then((resp) => {
      if (resp.status == "conflict"){
        console.log("uncorrect!");
        store.addNotification({
          message: "WRONG CODE!",
          type: "danger",
          container: "top-right",
          insert: "top",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],

          dismiss:{
            duration: 3500,
            onScreen: true
          },
        })
      }else {
        window.location = "/connect";
      }
    }).catch(err => console.log(err));
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
            <h3>ENTER INVITE CODE HERE</h3>
          </div>
          <div className='vertical-align'>
            <input
              className='input-code-join'
              type='text'
              value={this.state.code || ''}
              onChange={(e) => this.updateCode(e.target.value)}
              maxLength="6"/>
            <Button
              id="button-small-green"
              onClick={this.findGameByCode}>JOIN</Button>
          </div>
        </Card>
      </div>
    )
  }
}

export default JoinGameWithCode
