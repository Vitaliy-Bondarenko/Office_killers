import React from 'react';
import { Link } from 'react-router-dom';
import { KillerFontSVG } from './icons.js';
import requestmanager from '../../lib/requestmanager';

class WaitingView extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      game: props.game,
      current_user: props.current_user,
      current_player: props.current_player
    };
  }

  handleDestroyPlayer = () => {
    if (window.confirm('Are you sure you want to leave this game?')) {
      const { current_player } = this.state;
      const url = '/api/v1/players/' + current_player.id;
      requestmanager.request(url, 'delete').then((_resp) => {
        window.location = "/";
      }).catch(() => {});
    }
  }

  passPlayers = (user) => {
    return (
      <div className='user-wrapper email-input d-flex' key={user.id}>
        <img className='player-small-avatar' src={user.image_URL} />
        <p className='statistic-user-name'>{user.first_name} {user.last_name}</p>
      </div>
    );
  }

  render(){
    const players = this.state.game.players;
    return(
      <div className='absolute-center align-text-center width-92'>
        <div style={{width: '80%', maxWidth: '350px'}}>
          <KillerFontSVG />
        </div>
        <div className='mm-list-waskilled max-width-850'>
          <p className='small-text' style={{marginBottom: '10px'}}> YOUR GAME IS UNSTARTED. WAITING FOR ALL PLAYERS TO CONNECT</p>
          <p className='small-text' style={{marginTop: '10px'}}> WE WILL NOTIFY YOU WHEN GAME STARTS </p>
          <div className='top-btm-mar-30px'>
            <h1 className='medium-font'> CONNECTED USERS - {players.length} </h1>
            <hr align="center" width="25%" style={{minWidth: '100px'}} />
          </div>
          <div className='d-flex adaptive-user-table j-content-space-between width-100 f-wrap'>
            {players.map(this.passPlayers)}
          </div>
        </div>
        <div className='d-flex f-direction-row width-100 double-link-btn-wrapper j-content-center' >
          <Link to='/' style={{marginRight: '20px'}}>
            <button
                type="button">BACK TO MENU</button>
          </Link>
          <button
              className="red-btn"
              onClick={this.handleDestroyPlayer}
              type="button">DISCONNECT</button>
        </div>
      </div>
    );
  }
}

export default WaitingView;
