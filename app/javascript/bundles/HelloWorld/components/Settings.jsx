import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Button } from 'semantic-ui-react'
import requestmanager from "../../lib/requestmanager";

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_user_id: props.current_user_id,
      first_name: props.first_name,
      last_name: props.last_name,
      image_URL: props.imageProp,
      notify_game_start: props.notify_game_start,
      notify_game_finish: props.notify_game_finish,
      news: props.news
     };
  }

  submitSettings = () => {
    const params = { user: { first_name: this.state.first_name,
                             last_name: this.state.last_name,
                             notify_game_start: this.state.notify_game_start,
                             notify_game_finish: this.state.notify_game_finish,
                             news: this.state.news,
                             image_URL: this.state.image_URL} };
    const url = "/api/v1/users/" + this.state.current_userId;
    requestmanager.request(url, "put", params).then((resp) => {
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
            <img src={this.state.image_URL} id='img-profile' />
          </div>
          <br/>
          <form className='row'>
            <div className='column-firstname'>
              <label htmlFor="first-name-input" className='label-input-settings'>
                FIRST NAME
              </label>
              <input
                id='first-name-input'
                className='name-input'
                type='text'
                onChange={(e) => this.updateFName(e.target.value)}
                value={this.state.first_name} />
            </div>
            <div className='column-lastname'>
              <label htmlFor="last-name-input" className='label-input-settings'>
                LAST NAME
              </label>
              <input
                id='last-name-input'
                className='name-input'
                type='text'
                onChange={(e) => this.updateLName(e.target.value)}
                value={this.state.last_name} />
            </div>
          </form>
          <div>
            <h2 id="notif-settings-h2"> NOTIFICATIONS SETTING </h2>
            <form>
              <div className='text-align-left'>
                <input
                  id='notif-gm-st'
                  type='checkbox'
                  onChange={this.handleChangeForGmS}
                  checked={this.state.notify_game_start} />
                <label htmlFor='notif-gm-st' className='notify-gm'>NOTIFY ABOUT GAME START</label><br/>
              </div>
              <div className='text-align-left'>
                <input
                  id='notif-gm-fs'
                  type='checkbox'
                  onChange={this.handleChangeForGmF}
                  checked={this.state.notify_game_finish} />
                <label htmlFor='notif-gm-fs' className='notify-gm'>NOTIFY ABOUT GAME FINISH</label><br/>
              </div>
              <div className='text-align-left'>
                <input
                  id='notif-gm-news'
                  type='checkbox'
                  onChange={this.handleChangeForNews}
                  checked={this.state.news} />
                <label htmlFor='notif-gm-news' className='notify-gm'>NEWS</label>
              </div>
            </form>
          </div>
        </div>
        <div>
          <Button id="mm-btn-right-margin"><a href='/'>BACK TO MENU</a></Button>
          <input
            id="mm-btn-green"
            type="button"
            onClick={this.submitSettings}
            value="SUBMIT CHANGES" />
        </div>
      </div>
    )
  }
}

export default Settings
