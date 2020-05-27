import React from 'react';
import { Button } from 'semantic-ui-react';
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
    const url = "/api/v1/users/" + this.state.current_userId;
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
      <div className='mm-list'>
        <div className='setting-div'>
          <h1> KILLER </h1>
          <div className='text-left-align'>
            <h2> YOUR PHOTO </h2>
            <p className='white-text-small'> USING FOR DISPLAYING YOUR PHOTO IN EACH GAME </p>
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
        <div style={{marginBottom: '30px'}}>
          <Link to='/'>
            <Button id="mm-btn-right-margin">BACK TO MENU</Button>
          </Link>
          <input
              id="mm-btn-green"
              onClick={this.handleSubmitSettings}
              type="button"
              value="SUBMIT CHANGES" />
        </div>
      </div>
    );
  }
}

export default Settings;
