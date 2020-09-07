import React from 'react';
import { Link } from 'react-router-dom';
import { CloseSVG } from './icons.js';
import requestmanager from '../../lib/requestmanager';

class StartGameWarn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: props.current_game,
    };
  }

  handleGameStart = () => {
    const { game } = this.state;
    const url = '/api/v1/games/' + game.id + '/killer_start';
    requestmanager.request(url, 'PUT').then((_resp) => {
      window.location = '/game';
    }).catch(() => {});
  }

  render() {
    const { game } = this.state;
    return (
      <div className='mm-list-centered'>
        <div className='card-center' style={{padding: '0 20px'}}>
          <Link className='corner-close' to='/'>
            <CloseSVG />
          </Link>
          <div className='medium-padding'>
            <h3 style={{margin: '0', fontWeight: '300'}}>DO YOU REALLY WANT TO START GAME?</h3>
          </div>
          <div>
            <hr align="center" style={{color: 'black'}} width="25%" />
          </div>
          <div className='small-padding'>
            <h3 style={{margin: '0', fontWeight: '300'}}>PLAYERS IN GAME - {game.players.length}</h3>
          </div>
          <div className='vertical-align' style={{marginBottom: '10px'}}>
            <Link to='/game'>
              <input
                  id="button-big-red"
                  type='button'
                  value='CANCEL' />
            </Link>
            <input
                id="button-big-green"
                onClick={this.handleGameStart}
                type='button'
                value='START GAME' />
          </div>
        </div>
      </div>
    );
  }
}

export default StartGameWarn;
