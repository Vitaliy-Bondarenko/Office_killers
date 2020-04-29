import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class StartGameWarn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: props.current_game,
    };
  }
  render() {
    const { game } = this.state;
    return (
      <div className='mm-list-centered'>
        <Card className='card-center' style={{width: '70%'}}>
          <div className='float-right'>
            <a className='corner-close' href='/'>
              <Icon name='close' />
            </a>
          </div>
          <div className='medium-padding'>
            <h3>DO YOU REALLY WANT TO START GAME?</h3>
          </div>
          <div>
            <hr align="center" style={{color: 'black'}} width="25%" />
          </div>
          <div className='small-padding'>
            <h3>PLAYERS IN GAME - {game.players.length}</h3>
          </div>
          <div className='vertical-align'>
            <Link to='/game'>
              <Button id="button-big-red">CANCEL</Button>
            </Link>
            <Button id="button-big-green">START</Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default StartGameWarn;
