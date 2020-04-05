import React from 'react';
import PropTypes from 'prop-types';
import {Button, Card, Icon, Link} from 'semantic-ui-react'

const JoinGameWithCode = () => {
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
            maxLength="6"/>
          <Button id="button-small-green">JOIN</Button>
        </div>
      </Card>
    </div>
  )
}

export default JoinGameWithCode
