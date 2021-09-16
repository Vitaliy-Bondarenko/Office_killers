import React from 'react';
import { Link } from 'react-router-dom';
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

  render(){
    return(
      <div className='absolute-center align-text-center width-92'>
        <h1 className='login-font' style={{margin: '0'}}> KILLER </h1>
        <div className='mm-list-waskilled'>
          <p class='medium-text'> Players in game - {this.state.game.players.length} </p>
          <div className='horizontal-line'> <hr /> </div>
          <p className='small-text' style={{marginBottom: '10px'}}> YOUR GAME IS UNSTARTED. WAITING FOR ALL PLAYERS TO CONNECT</p>
          <p className='small-text' style={{marginTop: '10px'}}> WE WILL NOTIFY YOU WHEN GAME STARTS </p>
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
