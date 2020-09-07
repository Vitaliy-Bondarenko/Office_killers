import React from 'react';
import requestmanager from "../../lib/requestmanager";
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: props.user_id,
      first_name: props.first_name,
      last_name: props.last_name,
      image_URL: props.imageProp,
      notify_game_start: props.notify_game_start,
      notify_game_finish: props.notify_game_finish,
      news: props.news
     };
  }

  handleSubmitSettings = () => {
    const params = { user: { first_name: this.state.first_name,
                             last_name: this.state.last_name,
                             notify_game_start: this.state.notify_game_start,
                             notify_game_finish: this.state.notify_game_finish,
                             news: this.state.news,
                             image_URL: this.state.image_URL} };
    const url = "/api/v1/users/" + this.state.user_id;
    requestmanager.request(url, "put", params).then((_resp) => {
     }).catch(() => {});
  };

  updateFName = (first_name) => {
    this.setState({ first_name });
  }

  handleChangeForGmS = () => {
    this.setState({ notify_game_start: !this.state.notify_game_start });
  }

  handleChangeForNews = () => {
    this.setState({ news: !this.state.news });
  }

  handleChangeForGmF = () => {
    this.setState({ notify_game_finish: !this.state.notify_game_finish });
  }

  updateLName = (last_name) => {
    this.setState({ last_name });
  }

  render(){
    return (
      <div className='mobile-width'>
        <div className='setting-div' style={{width: 'min-content'}}>
          <h1 className='big-font' style={{margin: '0'}}> KILLER </h1>
          <div className='text-left-align'>
            <h2> YOUR PHOTO </h2>
            <p className='white-text-small' style={{margin: '0'}}> USING FOR DISPLAYING YOUR PHOTO IN EACH GAME </p>
          </div>
          <div>
            <img id='img-profile' src={this.state.image_URL} />
          </div>
          <div className='row-field'>
            <div className='column-firstname'>
              <label className='label-input-settings' htmlFor="first-name-input">
                FIRST NAME
              </label>
              <input
                  className='name-input'
                  id='first-name-input'
                  maxLength="16"
                  onChange={(e) => this.updateFName(e.target.value)}
                  type='text'
                  value={this.state.first_name} />
            </div>
            <div className='column-lastname'>
              <label className='label-input-settings' htmlFor="last-name-input">
                LAST NAME
              </label>
              <input
                  className='name-input'
                  id='last-name-input'
                  maxLength="20"
                  onChange={(e) => this.updateLName(e.target.value)}
                  type='text'
                  value={this.state.last_name} />
            </div>
          </div>
          <div className='text-align-left'>
            <h2 id="notif-settings-h2"> NOTIFICATIONS SETTING </h2>
            <div>
              <input
                  checked={this.state.notify_game_start}
                  className='notif-gm'
                  id='notif-gm-st'
                  onChange={this.handleChangeForGmS}
                  type='checkbox' />
              <label className='notify-gm' htmlFor='notif-gm-st'>NOTIFY ABOUT GAME START</label><br />
            </div>
            <div>
              <input
                  checked={this.state.notify_game_finish}
                  className='notif-gm'
                  id='notif-gm-fs'
                  onChange={this.handleChangeForGmF}
                  type='checkbox' />
              <label className='notify-gm' htmlFor='notif-gm-fs'>NOTIFY ABOUT GAME FINISH</label><br />
            </div>
            <div>
              <input
                  checked={this.state.news}
                  className='notif-gm'
                  id='notif-gm-news'
                  onChange={this.handleChangeForNews}
                  type='checkbox' />
              <label className='notify-gm' htmlFor='notif-gm-news'>NEWS</label>
            </div>
          </div>
        </div>
        <div style={{margin: '30px 0 30px 0'}}>
          <Link to='/'>
            <input
                id="mm-btn-settings"
                style={{backgroundColor: 'white', border: '0.2em solid white'}}
                type='button'
                value='BACK TO MENU' />
          </Link>
          <input
              id="mm-btn-settings"
              onClick={this.handleSubmitSettings}
              style={{backgroundColor: '#a8f7a8', border: '0.2em solid #a8f7a8'}}
              type="button"
              value="SUBMIT CHANGES" />
        </div>
      </div>
    );
  }
}

export default Settings;
