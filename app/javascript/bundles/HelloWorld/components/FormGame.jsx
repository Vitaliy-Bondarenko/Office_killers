import React from 'react';
import requestmanager from '../../lib/requestmanager';
import { store } from 'react-notifications-component';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import { KickIconSVG, BanIconSVG } from './icons.js';
import 'react-notifications-component/dist/theme.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'animate.css';

class FormGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_game: props.current_game && props.current_game.status != "finished" ? props.current_game : undefined,
      start_time: (props.game || {}).start_time ? new Date(props.game.start_time) : undefined,
      current_user: props.current_user,
      current_player: props.current_player,
      datetime_changed: false,
      bannedPlayerShow: false
    };

    window.forceUpdatePlayersCount = this.forceUpdatePlayersCount.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.getSessionInfo();
    this.getNewGame();
  }

  forceUpdatePlayersCount = (current_game) => {
    this.setState({ current_game });
  }

  getSessionInfo = () => {
    const url = '/api/v1/users/' + this.state.current_user.id + '/all_info';
    if (this.state.current_game) {
      requestmanager.request(url).then((resp) => {
        this.setState({ current_user: resp.user, current_game: resp.game, current_player: resp.player });
      }).catch(() => {});
    }
  }

  copyToClipboard = () => {
      const el = this.codeInputField;
      const sel = document.getSelection();
      el.select();
      document.execCommand("copy");
      sel.removeAllRanges();
      store.addNotification({
        message: "COPIED!",
        type: "success",
        container: "top-right",
        insert: "top",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],

        dismiss:{
          duration: 3500,
          onScreen: true
        },
      });
    }

  handleStartDate = (start_time) => {
    this.setState( { start_time, datetime_changed: true });
  }

  getNewGame = () => {
    const { current_game } = this.state;
    if (!current_game) {
      requestmanager.request('/api/v1/games/new').then((resp) => {
        this.setState({ current_game: resp });
      }).catch(() => {});
    }
  }

  destroyGame = () => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      const { current_game } = this.state;
      const url = '/api/v1/games/' + current_game.id;
      requestmanager.request(url, 'delete').then((_resp) => {
        window.location = "/game";
      }).catch(() => {});
    }
  }

  handleGameUpdate = () => {
    const { current_game } = this.state;
    const url = '/api/v1/games/' + current_game.id;
    const params = { current_game: { start_time: this.state.start_time }};
    requestmanager.request(url, 'PATCH', params).then((_resp) => {
      window.location = '/game';
    }).catch(() => {});
  }

  destroyPlayer = (player_id) => {
    if (window.confirm('Are you sure you want to kick this player?')) {
      const url = '/api/v1/players/' + player_id;
      requestmanager.request(url, 'delete').then((_resp) => {
      }).catch(() => {});
    }
  }

  banPlayer = (player_id) => {
    if (window.confirm('Are you sure you want to ban this player?')) {
      const url = '/api/v1/players/' + player_id + '/ban_player';
      requestmanager.request(url, 'delete').then((_resp) => {
      }).catch(() => {});
    }
  }

  unbanUser = (user_id) => {
    if (window.confirm('Are you sure you want to unban this player?')) {
      const url = '/api/v1/players/' + user_id + '/unban_player?game_id=' + this.state.current_game.id;
      requestmanager.request(url, 'put').then((_resp) => {
      }).catch(() => {});
    }
  }

  showStartGameButton = () => {
    const current_game = this.state.current_game || {};
    const { current_player, datetime_changed } = this.state;
    if (current_game.id){
      if (current_player.current_game_owner){
        return (
          <button
              className="green-btn"
              onClick={datetime_changed ? this.handleGameUpdate : this.handleSubmitSettings}
              type="button"> {datetime_changed ? "UPDATE GAME" : "START GAME"} </button>
          );
      }
    } else {
      return(
        <button
            className="green-btn"
            onClick={this.handleSubmitSettings}
            type="button">CREATE GAME </button>
        );
    }
  }

  passPlayers = (user) => {
    return (
      <div className='user-wrapper email-input d-flex j-content-space-between' key={user.id}>
        <div className='d-flex'>
          <img className='player-small-avatar' src={user.avatar} />
          <p className='statistic-user-name'>{user.full_name}</p>
        </div>
        {this.state.current_player.id != user.id &&
          <>
            <div className='d-flex align-items-center j-content-space-between' style={{width: '41px'}}>
              <span
                onClick={() => this.destroyPlayer(user.id)}
                title='kick'
                className='cursor-pointer'>
                <KickIconSVG />
              </span>
              <span
                onClick={() => this.banPlayer(user.id)}
                title='bam'
                className='cursor-pointer red-color'>
                <BanIconSVG />
              </span>
            </div>
          </>
        }
      </div>
    );
  }

  getBannedUsers = (user) => {
    return (
      <div className='email-input d-flex j-content-space-between' key={user.id}>
        <div className='d-flex'>
          <img className='player-small-avatar' src={user.avatar} />
          <p className='statistic-user-name'>{user.full_name}</p>
        </div>
        <div className='d-flex align-items-center j-content-space-between' style={{marginLeft: '10px'}}>
          <span
            onClick={() => this.unbanUser(user.id)}
            title='unban'
            className='cursor-pointer red-color'>
            <BanIconSVG />
          </span>
        </div>
      </div>
    );
  }

  handleSubmitSettings = () => {
    const { current_game } = this.state;
    if (!current_game.id || current_game.status == "finished") {
      const params = { game: { code: current_game.code,
                               start_time: this.state.start_time }
      };
      requestmanager.request('/api/v1/games/', 'post', params).then((_resp) => {
        window.location = '/game';
      }).catch(() => {});
    } else {
      if (current_game.players.length > 2)
        window.location = '/confirm';
      else {
        store.addNotification({
          message: "NOT ENOUGH PLAYERS FOR GAME!",
          type: "danger",
          container: "top-right",
          insert: "top",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],

          dismiss:{
            duration: 3500,
            onScreen: true
          },
        });
      }
    }
  }

  render() {
    const current_game = this.state.current_game || {};
    const players = current_game.players || [];
    const { start_time, bannedPlayerShow } = this.state;
    return(
      <div className='align-text-center'>
        <div className='d-flex f-direction-col width-100 j-content-space-between align-items-center'>
          <h1 className='big-font'> CREATE GAME </h1>
          <div className='d-flex f-direction-col width-100 max-width-850'>
            <div>
              <div className='column-qr-code'>
                <div className='qr-code-wrapper'>
                  <label className='text-above-qr' htmlFor="qr-code">
                    CONNECTING PLAYERS VIA QR CODE
                  </label>
                  {current_game.id ? undefined : <><p> Create game and share this QR code to other players </p></>}
                  <QRCode
                      bgColor={"#000000"}
                      fgColor={"#ffffff"}
                      size={350}
                      style={{marginTop: '5px',
                              minWidth: '40%',
                              minHeight: '40%',
                              height: '100%',
                              width: '100%',
                              opacity: current_game.id ? '1' : '0.3'}}
                      value={window.location.origin + '/games/' + current_game.code} />
                </div>
              </div>
              <div className='column-game-update'>
                <div className={current_game.id ? 'form-game-attributes' : 'form-game-attributes disabled-inputs'}>
                  <label className='text-above-qr' htmlFor="code-input">
                    CONNECTING PLAYERS VIA CODE
                  </label>
                  <input
                      className='code-for-game'
                      id='code-input'
                      readOnly
                      ref={(codeInputField) => this.codeInputField = codeInputField}
                      type='text'
                      value={current_game.code || ""} />
                  <button
                      className='copy-to-clipboard'
                      onClick={() => this.copyToClipboard()}
                      type='button'>
                    COPY TO CLIPBOARD
                  </button>
                </div>
                <div className={current_game.id ? 'form-game-attributes' : ' form-game-attributes disabled-inputs'}>
                  <label className='text-above-qr' htmlFor="date-picker">
                    SET GAME START TIME
                  </label>
                  <DateTimePicker
                      className='date-time-picker'
                      format="dd-MM-y hh:mm a"
                      id='date-picker'
                      onChange={this.handleStartDate}
                      value={start_time} />
                </div>
                {current_game.id &&
                  <>
                    <div className='form-game-attributes banned-users-wrapper'>
                      <p className='text-above-qr'>BANNED USERS <span className='cursor-pointer' onClick={() => this.setState({ bannedPlayerShow: !this.state.bannedPlayerShow })}>{bannedPlayerShow ? '▼' : '▲'}</span></p>
                      <div className={`d-flex banned-users-container adaptive-user-table width-100 f-wrap ${this.state.bannedPlayerShow && 'visible'}`}>
                        {current_game.banned_users.map(this.getBannedUsers)}
                      </div>
                    </div>
                  </>}
              </div>
            </div>
            <div>
              {current_game.id &&
                <>
                  <div className='top-btm-mar-30px'>
                    <h1 className='medium-font'> CONNECTED USERS - {players.length} </h1>
                    <hr align="center" width="25%" style={{minWidth: '100px'}} />
                  </div>
                  <div className='d-flex adaptive-user-table j-content-space-between width-100 f-wrap'>
                    {players.map(this.passPlayers)}
                  </div>
                </> }
              <div
                  className='d-flex f-direction-row top-btm-mar-30px triple-link-btn-wrapper j-content-space-between width-100' style={{justifyContent: !current_game.id ? 'center' : 'space-between'}}>
                <Link to='/' style={{marginRight: current_game.id ? '0' : '20px'}}>
                  <button
                      type="button">BACK TO MENU</button>
                </Link>
                {current_game.id &&
                  <button
                      className="red-btn"
                      onClick={this.destroyGame}
                      type="button"> CANCEL GAME </button> }
                {this.showStartGameButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormGame;
