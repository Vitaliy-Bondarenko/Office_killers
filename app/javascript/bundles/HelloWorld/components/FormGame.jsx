import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import requestmanager from '../../lib/requestmanager';

class FormGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: props.game
    }
  }

  UNSAFE_componentWillMount() {
    this.getNewGame();
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

  submitSettings = () => {
    const { game } = this.state;
    if (!game.id) {
      const params = { game: { code: game.code,
                               start_time: game.start_time }
      };
      requestmanager.request('/api/v1/games/', 'post', params).then((_resp) => {
        window.location = "/";
      }).catch(() => {});
    }
  }

  render() {
    const game = this.state.game || {};
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
            <input
              id='code-input'
              className='code-for-game'
              type='text'
              readOnly
              value={game.code || ""} />
          </div>
        </div>
        <div className='mm-list-min-padding' style={{margin: '30px 0 30px 0'}}>
          <h1 className='medium-text'> CONNECTED USER </h1>
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
              <Button id='mm-btn-white'><a href='/'>BACK TO MENU</a></Button>
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
                id="mm-btn-red"
                type="button"
                onClick={this.destroyGame}
                value="CANCEL GAME" />
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
