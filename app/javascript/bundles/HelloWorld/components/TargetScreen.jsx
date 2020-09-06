import React from 'react';
import requestmanager from '../../lib/requestmanager';
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
    const { current_player } = this.state;
    const url = '/api/v1/players/' + current_player.id + '/death_confirm';
    requestmanager.request(url, 'PUT').then((_resp) => {
    }).catch(() => {});
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
        <div
            style={{position: 'absolute',
                    display: 'block',
                    background: 'white',
                    padding: '20px 30px',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%'}}>
          <div className='medium-padding'>
            <h3 style={{margin: '0'}}>DID YOU KILL YOUR TARGET?</h3>
          </div>
          <div>
            <hr align="center" style={{color: 'black', marginBottom: '20px'}} width="25%" />
          </div>
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
            disabled
            id="mm-btn"
            style={{margin: "0 1.5%", width: '47%'}}
            type="button">WAITING FOR CONFIRM</button>
      );
    }else {
      return(
        <input
            id="mm-btn-red"
            onClick={this.handlePlayerDeathConfirm}
            style={{margin: "0 1.5%", width: '47%'}}
            type="button"
            value="I WAS KILLED" />
      );
    }
  }

  render(){
    const { current_player } = this.state;
    return (
      <div className='mm-list' style={{height: '100%', width: '100%'}}>
        <div className='setting-div'>
          {this.DeathConfirmWindow()}
          <h1 className='big-font'> KILLER </h1>
          <div className='image-label-center'>
            <h2> YOUR TARGET IS </h2>
            <h2 className='mini-text'> {current_player.target_info.email} </h2>
          </div>
          <div style={{marginBottom: "20px"}}>
            <img id='img-target' src={current_player.target_info.image_URL} />
          </div>
          <br />
        </div>
        <div style={{marginBottom: '10px'}}>
          <Link to='/'>
            <input
                id="mm-btn"
                style={{margin: "0 1.5% 0 1.5%", width: '47%'}}
                type='button'
                value='BACK TO MENU' />
          </Link>
          {this.DeathWaitingButton()}
        </div>
      </div>
    );
  }
}

export default TargetScreen;
