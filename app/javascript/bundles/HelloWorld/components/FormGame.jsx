import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import requestmanager from '../../lib/requestmanager';
import ReactNotification from 'react-notifications-component';
import { useHistory, Link, BrowserRouter as Router } from 'react-router-dom'
import {store} from 'react-notifications-component';
import 'animate.css'
import 'react-notifications-component/dist/theme.css'

class FormGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: props.game,
      start_time: this.game ? props.game.start_time.format("YYYY-MM-DDTkk:mm") : new Date(),
      current_user: props.current_user,
      owner_id: props.owner_id,
      current_game: props.game,
      current_player: props.current_player
    }
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
      })
    }

  handleStartDate = (start_time) => {
    this.setState( { start_time });
  }

  getNewGame = () => {
    if (!this.state.game) {
      requestmanager.request('/api/v1/games/new').then((resp) => {
        this.setState({ game: resp });
      }).catch(() => {});
    }
  }

  destroyGame = () => {
    const { game } = this.state;
    const url = '/api/v1/games/' + game.id;
    requestmanager.request(url, 'delete').then((resp) => {
      window.location = "/";
    }).catch(() => {});
  }

  destroyPlayer = () => {
    const { current_player } = this.state;
    const url = '/api/v1/players/' + current_player.id;
    requestmanager.request(url, 'delete').then((resp) => {
      window.location = "/";
    }).catch(() => {});
  }

  submitSettings = () => {
    const { game } = this.state;
    if (!game.id) {
      const params = { game: { code: game.code,
                               start_time: this.state.start_time }
      };
      requestmanager.request('/api/v1/games/', 'post', params).then((_resp) => {
        window.location = "/";
      }).catch(() => {});
    }
  }

  render() {
    const game = this.state.game || {}
    return(
      <div className='mm-list-min-padding'>
        <h1> KILLER </h1>
        <div className='row-inline-block'>
          <div className='column-firstname'>
            <label htmlFor="qr-code" className='image-label-center'>
              CONNECTING PLAYERS VIA QR CODE
            </label>
            <img src='https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png'
              id='qr-code'
              className='qr-code-img'/>
          </div>
          <div className='column-lastname'>
            <label htmlFor="code-input" className='image-label-center'>
              CONNECTING PLAYERS VIA CODE
            </label>
            <div className='display-flex'>
              <input
                id='code-input'
                className='code-for-game'
                type='text'
                readOnly
                ref={(codeInputField) => this.codeInputField = codeInputField}
                value={game.code || ""} />
              <button className='copyToClipboard' onClick={() => this.copyToClipboard()}>
                COPY TO CLIPBOARD
              </button>
            </div>
            <label htmlFor="date-picker" className='image-label-center-margin'>
              SET GAME START TIME
            </label>
            <input
              id='date-picker'
              type='datetime-local'
              className='date-time-picker'
              onChange={(e) => this.handleStartDate(e.target.value)}
              value={game.start_time || undefined} />
          </div>
        </div>
        <div className='mm-list-min-padding' style={{margin: '30px 0 30px 0'}}>
          <h1 className='medium-text'> CONNECTED USERS </h1>
          <hr align="center" width="25%"/>
          <div className='row-map'>
            <div className='row-map-emails'>
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <Link to='/'>
                <Button id='mm-btn-white'>BACK TO MENU</Button>
              </Link>
            </div>
            <div className='row-map-emails'>
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
                {game.id ?
                    <input
                      id="mm-btn-red"
                      type="button"
                      onClick={this.state.owner_id == this.state.current_user ?
                                  this.destroyGame :
                                  this.destroyPlayer}
                      value={this.state.owner_id == this.state.current_user ? "CANCEL GAME" : "DISCONNECT FROM GAME"} />:
                    undefined }
                }
            </div>
            <div className='row-map-emails'>
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
              <input
                className='input-disabled-map-email'
                type='text'
                disabled={true} />
                <input
                  id="mm-btn-green"
                  type="button"
                  onClick={this.submitSettings}
                  value={game.id ? "START GAME" : "CREATE GAME"} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FormGame
