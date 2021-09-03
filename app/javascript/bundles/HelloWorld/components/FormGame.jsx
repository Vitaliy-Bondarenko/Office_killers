import React from 'react';
import requestmanager from '../../lib/requestmanager';
import { store } from 'react-notifications-component';
import QRCode from 'qrcode.react';
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import 'react-notifications-component/dist/theme.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'animate.css';

class FormGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: props.game && props.game.status != "finished" ? props.game : undefined,
      start_time: (props.game || {}).start_time ? new Date(props.game.start_time) : undefined,
      current_user: props.current_user,
      current_player: props.current_player,
      datetime_changed: false
    };
  }

  UNSAFE_componentWillMount() {
    this.getNewGame();
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
    const { game } = this.state;
    if (!game) {
      requestmanager.request('/api/v1/games/new').then((resp) => {
        this.setState({ game: resp });
      }).catch(() => {});
    }
  }

  destroyGame = () => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      const { game } = this.state;
      const url = '/api/v1/games/' + game.id;
      requestmanager.request(url, 'delete').then((_resp) => {
        window.location = "/game";
      }).catch(() => {});
    }
  }

  handleGameUpdate = () => {
    const { game } = this.state;
    const url = '/api/v1/games/' + game.id;
    const params = { game: { start_time: this.state.start_time }};
    requestmanager.request(url, 'PATCH', params).then((_resp) => {
      window.location = '/game';
    }).catch(() => {});
  }

  destroyPlayer = () => {
    const { current_player } = this.state;
    const url = '/api/v1/players/' + current_player.id;
    requestmanager.request(url, 'delete').then((_resp) => {
      window.location = "/";
    }).catch(() => {});
  }

  showStartGameButton = () => {
    const game = this.state.game || {};
    const { current_player, datetime_changed } = this.state;
    if (game.id){
      if (current_player.current_game_owner){
        return (
          <button
              className="created-game-btns"
              onClick={datetime_changed ? this.handleGameUpdate : this.handleSubmitSettings}
              type="button"> {datetime_changed ? "UPDATE GAME" : "START GAME"} </button>
          );
      }
    } else {
      return(
        <button
            className="created-game-btns"
            onClick={this.handleSubmitSettings}
            style={{backgroundColor: '#a8f7a8', marginLeft: '20px'}}
            type="button">CREATE GAME </button>
        );
    }
  }

  passPlayers = (user) => {
    return (
      <div className='user-wrapper' key={user.id}>
        <p className="email-input">{user.first_name} {user.last_name}</p>
      </div>
    );
  }

  handleSubmitSettings = () => {
    const { game } = this.state;
    if (!game.id || game.status == "finished") {
      const params = { game: { code: game.code,
                               start_time: this.state.start_time }
      };
      requestmanager.request('/api/v1/games/', 'post', params).then((_resp) => {
        window.location = '/game';
      }).catch(() => {});
    } else {
      if (game.players.length > 2)
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
    const game = this.state.game || {};
    const players = game.players || [];
    const { start_time, current_player } = this.state;
    return(
      <div className='mm-list-min-padding'>
        <h1 className='big-font' style={{margin: '0'}}> CREATE GAME </h1>
        <div className='row-inline-block'>
          <div className='column-qr-code'>
            <label className='text-above-qr' htmlFor="qr-code">
              CONNECTING PLAYERS VIA QR CODE
            </label>
            <QRCode
                bgColor={"#000000"}
                fgColor={"#ffffff"}
                size={350}
                style={{marginTop: '10px',
                        minWidth: '40%',
                        minHeight: '40%',
                        maxWidth: '350px',
                        maxHeight: '350px',
                        height: '100%',
                        width: '100%'}}
                value={window.location.origin + '/games/' + game.code} />
          </div>
          <div className='column-game-update'>
            <div style={{maxWidth: '350px', maxHeight: '350px', marginBottom: '15px'}}>
              <label className='text-above-qr' htmlFor="code-input">
                CONNECTING PLAYERS VIA CODE
              </label>
              <input
                  className='code-for-game'
                  id='code-input'
                  readOnly
                  ref={(codeInputField) => this.codeInputField = codeInputField}
                  type='text'
                  value={game.code || ""} />
              <button
                  className='copy-to-clipboard'
                  onClick={() => this.copyToClipboard()}
                  type='button'>
                COPY TO CLIPBOARD
              </button>
            </div>
            <div style={{maxWidth: '350px', maxHeight: '350px', width: '100%'}}>
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
          </div>
        </div>
        <div className='connected-users-wrapper' style={{margin: '30px 0 10px 0'}}>
          {game.id ?
            <>
              <div>
                <h1 className='medium-font' style={{margin: '0'}}> CONNECTED USERS </h1>
                <hr align="center" width="25%" />
              </div>
              <div className='connected-users'>
                {players.map(this.passPlayers)}
              </div>
            </> : undefined }
          <div
              className='row-map' style={{justifyContent: !game.id ? 'center' : 'space-between'}}>
            <Link to='/' className='back-link-game-form' style={{marginRight: !game.id ? '20px' : '0'}}>
              <button
                  className="created-game-btns"
                  style={{backgroundColor: 'white'}}
                  type="button">BACK TO MENU</button>
            </Link>
            {game.id ?
              <button
                  className="created-game-btns"
                  onClick={this.destroyGame}
                  style={{backgroundColor: '#ef9c9c'}}
                  type="button"> CANCEL GAME </button> : undefined }
            {this.showStartGameButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default FormGame;
