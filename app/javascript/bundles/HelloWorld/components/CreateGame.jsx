import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import requestmanager from '../../lib/requestmanager';

class CreateGame extends React.Component {
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
        <div className='row' style={{padding: "0 70px 0 70px"}}>
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
          <div className='row' style={{width: '100%', display: 'flex', boxSizing:'border-box'}}>
            <div className='row' style={{width: '33%'}}>
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                id="mm-btn-green"
                style={{}}
                type="button"
                onClick={undefined}
                value="BACK TO MENU" />
            </div>
            <div className='row' style={{width: '33%'}}>
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                id="mm-btn-green"
                type="button"
                onClick={undefined}
                value="CANCEL GAME" />
            </div>
            <div className='row' style={{width: '33%'}}>
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
                type='text'
                disabled={true} />
              <input
                style={{width:'200px', height:'30px', margin:'10px 0 5px 0'}}
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

export default CreateGame
