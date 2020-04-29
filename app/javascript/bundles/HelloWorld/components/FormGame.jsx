import React from 'react';
import requestmanager from '../../lib/requestmanager';
import {store} from 'react-notifications-component';
import { Row, Col } from "reactstrap";
import QRCode from 'qrcode.react';
import DateTimePicker from 'react-datetime-picker';
import 'react-notifications-component/dist/theme.css';
import "bootstrap/dist/css/bootstrap.css";
import 'animate.css';

class FormGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: props.game,
      start_time: (props.game || {}).start_time ? new Date(props.game.start_time) : undefined,
      current_user: props.current_user,
      owner_id: props.owner_id,
      current_player: props.current_player
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
    this.setState( { start_time });
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
    const { game } = this.state;
    const url = '/api/v1/games/' + game.id;
    requestmanager.request(url, 'delete').then((_resp) => {
      window.location = "/";
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
    const {owner_id, current_user} = this.state;
    if (game.id){
      if (owner_id == current_user){
        return (
          <input
              id="mm-btn-green-width"
              onClick={this.handleSubmitSettings}
              type="button"
              value={"START GAME"} />
          );
      }
    }else {
      return(
        <input
            id="mm-btn-green-width"
            onClick={this.handleSubmitSettings}
            type="button"
            value={"CREATE GAME"} />
        );
    }
  }

  passPlayers = (user) => {
    return (
      <Col key={user.id} xs='4'>
        <div className="email-input">{user.email}</div>
      </Col>
    );
  }

  handleSubmitSettings = () => {
    const { game } = this.state;
    if (!game.id) {
      const params = { game: { code: game.code,
                               start_time: this.state.start_time }
      };
      requestmanager.request('/api/v1/games/', 'post', params).then((_resp) => {
        window.location = '/game';
      }).catch(() => {});
    }else{
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
    const { start_time, owner_id, current_user } = this.state;
    return(
      <div className='mm-list-min-padding'>
        <h1> KILLER </h1>
        <div className='row-inline-block'>
          <div className='column-firstname'>
            <label className='text-above-qr' htmlFor="qr-code">
              CONNECTING PLAYERS VIA QR CODE
            </label>
            <QRCode
                bgColor={"#000000"}
                fgColor={"#ffffff"}
                size={350}
                style={{borderWidth: '10px', borderColor: "white", marginTop: '10px'}}
                value={window.location.origin + '/games/' + game.code} />
          </div>
          <div className='column-lastname'>
            <label className='text-above-qr' htmlFor="code-input">
              CONNECTING PLAYERS VIA CODE
            </label>
            <div className='display-flex'>
              <input
                  className='code-for-game'
                  id='code-input'
                  readOnly
                  ref={(codeInputField) => this.codeInputField = codeInputField}
                  type='text'
                  value={game.code || ""} />
              <button
                  className='copyToClipboard'
                  onClick={() => this.copyToClipboard()}
                  type='button'>
                COPY TO CLIPBOARD
              </button>
            </div>
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
        <div className='mm-list-min-padding' style={{margin: '30px 0 30px 0'}}>
          {game.id ?
            <div>
              <h1 className='medium-text'> CONNECTED USERS </h1>
              <hr align="center" width="25%" />
            </div> :
            undefined }
          <div>
            <Row className='all-center' style={{marginBottom: '50px'}}>
              {game.id ? players.map(this.passPlayers) : undefined }
            </Row>
          </div>
          <div className='row-map' style={{marginTop: '20px'}}>
            <a className='back-to-menu-button' href='/' style={{textDecoration: 'none'}}>BACK TO MENU</a>
            {game.id ?
              <input
                  id="mm-btn-red-width"
                  onClick={owner_id == current_user ?
                                  this.destroyGame :
                                  this.destroyPlayer}
                  style={{marginRight: "43px"}}
                  type="button"
                  value={owner_id == current_user ?
                             "CANCEL GAME" :
                             "DISCONNECT FROM GAME"} /> :
                    undefined }
            {this.showStartGameButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default FormGame;
