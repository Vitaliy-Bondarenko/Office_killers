import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
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
      window.location = "/game";
    }).catch(() => {});
  }

  handlePlayerDeathConfirm = () => {
    const { current_player } = this.state;
    const url = '/api/v1/players/' + current_player.id + '/death_confirm';
    requestmanager.request(url, 'PUT').then((_resp) => {
      window.location = "/game";
    }).catch(() => {});
  }

  handlePlayerKill = () => {
    const { current_player } = this.state;
    const url = '/api/v1/players/' + current_player.id + '/player_killed';
    requestmanager.request(url, 'PUT').then((_resp) => {
      location.reload();
    }).catch(() => {});
  }

  DeathConfirmWindow = () => {
    const { current_player } = this.state;
    if (current_player.target_info.status == 'death_confirm'){
      return(
        <Card
            style={{margin: '20% auto',
                    position: 'absolute',
                    width: 'auto',
                    display: 'block'}}>
          <div className='float-right'>
            <a className='corner-close' href='/'>
              <Icon name='close' />
            </a>
          </div>
          <div className='medium-padding'>
            <h3>DID YOU KILL YOUR TARGET?</h3>
          </div>
          <div>
            <hr align="center" style={{color: 'black'}} width="25%" />
          </div>
          <div className='vertical-align'>
            <Link to='/game'>
              <Button
                  id="button-big-red"
                  onClick={this.handleNoKill}>NO
              </Button>
            </Link>
            <Button
                id="button-big-green"
                onClick={this.handlePlayerKill}>YES</Button>
          </div>
        </Card>
      );
    }
  }

  render(){
    const { current_player } = this.state;
    return (
      <div className='mm-list'>
        <div className='setting-div'>
          {this.DeathConfirmWindow()}
          <h1> KILLER </h1>
          <div className='image-label-center'>
            <h2> YOUR TARGET IS </h2>
            <h2 className='mini-text'> {current_player.target_info.email} </h2>
          </div>
          <div style={{marginBottom: "20px"}}>
            <img id='img-profile' src={current_player.target_info.image_URL} />
          </div>
          <br />
        </div>
        <div>
          <Link to='/'>
            <Button id="mm-btn-right-margin">BACK TO MENU</Button>
          </Link>
          <input
              id="mm-btn-red"
              onClick={this.handlePlayerDeathConfirm}
              style={{marginLeft: "25px"}}
              type="button"
              value="I WAS KILLED" />
        </div>
      </div>
    );
  }
}

export default TargetScreen;
