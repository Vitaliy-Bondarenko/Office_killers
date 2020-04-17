import React from 'react';
import { Button, Grid } from 'semantic-ui-react';
import requestmanager from '../../lib/requestmanager';
import { Link } from 'react-router-dom';
import {store} from 'react-notifications-component';
import 'animate.css';
import 'react-notifications-component/dist/theme.css';

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
    if (!this.state.game) {
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

  handleSubmitSettings = () => {
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
    const game = this.state.game || {};
    return(
      <div className='mm-list-min-padding'>
        <h1> KILLER </h1>
        <div className='row-inline-block'>
          <div className='column-firstname'>
            <label className='image-label-center' htmlFor="qr-code">
              CONNECTING PLAYERS VIA QR CODE
            </label>
            <img
                className='qr-code-img'
                id='qr-code'
                src='https://shorturl.at/hkoGJ' />
          </div>
          <div className='column-lastname'>
            <label className='image-label-center' htmlFor="code-input">
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
            <label className='image-label-center-margin' htmlFor="date-picker">
              SET GAME START TIME
            </label>
            <input
                className='date-time-picker'
                id='date-picker'
                onChange={(e) => this.handleStartDate(e.target.value)}
                type='datetime-local'
                value={game.start_time || undefined} />
          </div>
        </div>
        <div className='mm-list-min-padding' style={{margin: '30px 0 30px 0'}}>
          <h1 className='medium-text'> CONNECTED USERS </h1>
          <hr align="center" width="25%" />
          <div className='row-map' style={{display: "block"}}>
            <Grid columns={3} padded='horizontally' style={{marginTop: '10px'}}>
              <Grid.Column className="box-content">
                <input
                    className='input-fields'
                    readOnly
                    type='text' />
                <input
                    className='input-fields'
                    disabled
                    type='text' />
                <input
                    className='input-fields'
                    disabled
                    type='text' />
                <input
                    className='input-fields'
                    disabled
                    type='text' />
              </Grid.Column>
              <Grid.Column className="box-content">
                <input
                    className='input-fields'
                    disabled
                    type='text' />
                <input
                    className='input-fields'
                    disabled
                    type='text' />
                <input
                    className='input-fields'
                    disabled
                    type='text' />
                <input
                    className='input-fields'
                    disabled
                    type='text' />
              </Grid.Column>
              <Grid.Column className="box-content">
                <input
                    className='input-fields'
                    disabled
                    type='text' />
                <input
                    className='input-fields'
                    disabled
                    type='text' />
                <input
                    className='input-fields'
                    disabled
                    type='text' />
                <input
                    className='input-fields'
                    disabled
                    type='text' />
              </Grid.Column>
            </Grid>
            <div className='row-map-buttons'>
              <Link to='/'>
                <Button id='mm-btn-white' style={{marginRight: "60px"}}>BACK TO MENU</Button>
              </Link>
              {game.id ?
                <input
                    id="mm-btn-red"
                    onClick={this.state.owner_id == this.state.current_user ?
                                  this.destroyGame :
                                  this.destroyPlayer}
                    style={{marginRight: "60px"}}
                    type="button"
                    value={this.state.owner_id == this.state.current_user ?
                             "CANCEL GAME" :
                             "DISCONNECT FROM GAME"} /> :
                    undefined }
              <input
                  id="mm-btn-green"
                  onClick={this.handleSubmitSettings}
                  type="button"
                  value={game.id ? "START GAME" : "CREATE GAME"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FormGame;
