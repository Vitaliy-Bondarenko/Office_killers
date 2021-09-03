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
      <div
          className='mm-list'
          style={{width: '100%'}}>
        <h1 className='login-font' style={{margin: '0'}}> KILLER </h1>
        <div className='mm-list-waskilled'>
          <p className='medium-text'> YOUR GAME IS UNSTARTED. WAITING FOR ALL PLAYERS TO CONNECT</p>
          <div className='horizontal-line'> <hr /> </div>
          <p className='small-text'> WE WILL NOTIFY YOU WHEN GAME STARTS </p>
        </div>
        <div style={{marginTop: '80px 0 50px'}}>
          <Link to='/'>
            <button
                className="mm-btn waiting-back"
                style={{margin: "0 3%"}}
                type="button">BACK TO MENU</button>
          </Link>
          <button
              id="mm-btn-red"
              onClick={this.handleDestroyPlayer}
              style={{margin: "0 3%", width: '44%'}}
              type="button">DISCONNECT</button>
        </div>
      </div>
    );
  }
}

export default WaitingView;
