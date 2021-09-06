import React from 'react';
import { Link } from 'react-router-dom';
import { KillerFontSVG } from './icons.js';
import requestmanager from '../../lib/requestmanager';

class StartGameWarn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: props.current_game,
      current_player: props.current_player
    };
  }

  UNSAFE_componentWillMount() {
    if (this.state.game.status == 'in_progress' || !this.state.current_player.current_game_owner) {
      window.location = '/game';
    }
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
      <div className='absolute-center align-text-center width-92'>
        <div style={{width: '80%', maxWidth: '350px'}}>
          <KillerFontSVG />
        </div>
        <div className='medium-padding'>
          <h2 className='medium-font' style={{margin: '0', fontWeight: '300', fontSize: '60px'}}>DO YOU REALLY WANT TO START GAME?</h2>
        </div>
        <hr align="center" width="25%" />
        <div style={{marginTop: '20px'}}>
          <h3 style={{fontSize: '50px'}} className='medium-font white-text'>PLAYERS IN GAME - {game.players.length}</h3>
        </div>
        <div className='d-flex f-direction-row top-btm-mar-30px max-width-850 double-link-btn-wrapper j-content-center width-100'>
          <Link to='/game' style={{marginRight: '20px'}}>
            <button
                type='button'>CANCEL</button>
          </Link>
          <button
              className='green-btn'
              onClick={this.handleGameStart}
              type='button'>START GAME</button>
        </div>
      </div>
    );
  }
}

export default StartGameWarn;
