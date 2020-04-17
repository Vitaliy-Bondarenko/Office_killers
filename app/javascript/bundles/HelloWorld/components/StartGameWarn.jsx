import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';

const StartGameWarn = () => {
  return (
    <div className='mm-list-centered'>
      <Card className='card-center'>
        <div className='float-right'>
          <a className='corner-close' href='/'>
            <Icon name='close' />
          </a>
        </div>
        <div className='small-padding'>
          <h3>DO YOU REALLY WANT TO START GAME?</h3>
        </div>
        <div className='align-center-webkit'>
          <div className='small-horizontal-line'> <hr /> </div>
        </div>
        <div className='small-padding'>
          <h3>PLAYERS IN GAME -</h3>
        </div>
        <div className='vertical-align'>
          <Button id="button-small-red"><a href='/'>CANCEL</a></Button>
          <Button id="button-small-green">JOIN</Button>
        </div>
      </Card>
    </div>
  );
};

export default StartGameWarn;
