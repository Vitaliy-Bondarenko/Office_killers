import React from 'react';
import requestmanager from '../../lib/requestmanager';
import { KillerFontSVG } from './icons.js';
import { Link } from 'react-router-dom';

class TargetScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_player: props.current_player
    };
  }

  handleNoKill = () => {
    const { current_player } = this.state;
    const url = '/api/v1/players/' + current_player.id + '/error_death';
    requestmanager.request(url, 'PUT').then((_resp) => {
    }).catch(() => {});
  }

  handlePlayerDeathConfirm = () => {
    if (window.confirm('Are you sure?')) {
      const { current_player } = this.state;
      const url = '/api/v1/players/' + current_player.id + '/death_confirm';
      requestmanager.request(url, 'PUT').then((_resp) => {
      }).catch(() => {});
    }
  }

  handlePlayerKill = () => {
    const { current_player } = this.state;
    const url = '/api/v1/players/' + current_player.id + '/player_killed';
    requestmanager.request(url, 'PUT').then((resp) => {
      if (resp.status == 'finished'){
        window.location.href = 'http://localhost:3000/best_killer';
      }
    }).catch(() => {});
  }

  DeathConfirmWindow = () => {
    if (this.state.current_player.target_info.status == 'death_confirm'){
      return(
        <div className='kill-target-card'>
          <div className='medium-padding'>
            <h3 style={{margin: '0', whiteSpace: 'nowrap'}}>DID YOU KILL YOUR TARGET?</h3>
          </div>
          <hr align="center" style={{color: 'black', marginBottom: '20px'}} width="25%" />
          <div className='vertical-align'>
            <Link to='/game'>
              <button
                  id="button-big-red"
                  onClick={this.handleNoKill}
                  type="button">NO
              </button>
            </Link>
            <button
                id="button-big-green"
                onClick={this.handlePlayerKill}
                type='button'>YES</button>
          </div>
        </div>
      );
    }
  }

  DeathWaitingButton = () => {
    if (this.state.current_player.status == "death_confirm"){
      return(
        <button
            className="created-game-btns"
            disabled
            style={{marginLeft: "15px"}}
            type="button">WAITING FOR CONFIRM</button>
      );
    }else {
      return(
        <button
            class="created-game-btns"
            onClick={this.handlePlayerDeathConfirm}
            style={{marginLeft: "15px", backgroundColor: '#ef9c9c'}}
            type="button">I WAS KILLED</button>
      );
    }
  }

  render(){
    const { current_player } = this.state;
    const player_target = current_player.target_info
    return (
      <div className='mm-list' style={{height: '100%', width: '100%'}}>
        <div className='setting-div' style={{alignItems: 'center', paddingTop: '25px'}}>
          <div style={{width: '80%'}}>
            <KillerFontSVG />
          </div>
          <div className='image-label-center'>
            <h2 style={{fontSize: '30px'}}> YOUR TARGET IS </h2>
            <h2 className='mini-text' style={{fontSize: '37px'}}> {player_target.first_name} {player_target.last_name} </h2>
          </div>
          <div style={{marginBottom: "20px", position: 'relative'}}>
            {this.DeathConfirmWindow()}
            <img className='img-target' src={player_target.image_URL} />
          </div>
          <div className='row-map'>
            <Link to='/'>
              <button
                  className="created-game-btns"
                  type='button'> BACK TO MENU </button>
            </Link>
            {this.DeathWaitingButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default TargetScreen;
