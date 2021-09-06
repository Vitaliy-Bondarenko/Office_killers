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
          <div className='d-flex f-direction-row double-link-btn-wrapper j-content-space-between width-100'>
            <Link to='/game'>
              <button
                  onClick={this.handleNoKill}
                  type="button">NO
              </button>
            </Link>
            <button
                className='red-btn'
                onClick={this.handlePlayerKill}
                type='button'>YES</button>
          </div>
        </div>
      );
    }
  }

  DeathWaitingButton = () => {
    if (this.state.current_player.status == "death_confirm" || this.state.current_player.target_info.status == 'death_confirm'){
      return(
        <button
            disabled
            type="button">WAITING FOR CONFIRM</button>
      );
    }else {
      return(
        <button
            className="red-btn"
            onClick={this.handlePlayerDeathConfirm}
            type="button">I WAS KILLED</button>
      );
    }
  }

  render(){
    const { current_player } = this.state;
    const player_target = current_player.target_info
    return (
      <div className='align-text-center'>
        <div className='d-flex f-direction-col adaptive-width align-items-center'>
          <div style={{width: '80%', maxWidth: '350px'}}>
            <KillerFontSVG />
          </div>
          <div className='image-label-center'>
            <h2 style={{fontSize: '30px'}}> YOUR TARGET IS </h2>
            <h2 className='mini-text' style={{fontSize: '37px'}}> {player_target.first_name} {player_target.last_name} </h2>
          </div>
          <div style={{marginBottom: "20px", position: 'relative', display: 'inline-flex', flexDirection: 'column'}}>
            <div style={{position: 'relative'}}>
              {this.DeathConfirmWindow()}
              <img className='profile-img' src={player_target.image_URL} />
            </div>
            <div className='d-flex f-direction-row top-btm-mar-30px double-link-btn-wrapper j-content-space-between'>
              <Link to='/'>
                <button
                    type='button'> BACK TO MENU </button>
              </Link>
              {this.DeathWaitingButton()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TargetScreen;
