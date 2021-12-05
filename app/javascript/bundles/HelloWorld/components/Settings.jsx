import React from 'react';
import requestmanager from "../../lib/requestmanager";
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import { SettingsFontSVG, UploadImageIconSVG } from './icons.js';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: props.user_id,
      first_name: props.first_name,
      last_name: props.last_name,
      notify_game_start: props.notify_game_start,
      notify_game_finish: props.notify_game_finish,
      news: props.news,
      avatar: props.avatar,
      image_preview: undefined,
      disabled: true,
      showSpinner: false
     };
  }

  UNSAFE_componentWillMount() {
    this.getUser();
  }

  getUser = () => {
    const url = '/api/v1/users/' + this.state.user_id;
    requestmanager.request(url).then((resp) => {
      this.setState({ first_name: resp.first_name,
                      last_name: resp.last_name,
                      notify_game_start: resp.notify_game_start,
                      notify_game_finish: resp.notify_game_finish,
                      avatar: resp.avatar,
                      image_preview: resp.avatar,
                      news: resp.news
                     });
    }).catch(() => {});
  }

  handleSubmitSettings = () => {
    this.setState({ disabled: true, showSpinner: true });
    const formData = new FormData();
    ['first_name', 'last_name', 'notify_game_start', 'notify_game_finish', 'news'].forEach((attribute) =>
      this.state[attribute] != this.props[attribute] && formData.append(`user[${attribute}]`, this.state[attribute])
    );
    typeof this.state.avatar == 'object' && formData.append(`user[avatar]`, this.state.avatar);
    const url = "/api/v1/users/" + this.state.user_id;
    requestmanager.request(url, "put", formData, true).then((resp) => {
      this.setState({ showSpinner: false })
      if (resp.status == 'success'){
        this.notificationPopUp("CHANGES SAVED!", 'success');
      } else {
        this.notificationPopUp(resp.status, 'danger');
      }
    }).catch(() => {});
  };

  notificationPopUp = (text, type) => {
    store.addNotification({
      message: text,
      type: type,
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

  handleUpdateFields = (event) => {
    event.preventDefault();
    let value = event.target.value.replace(/\s/g, '');
    const field = event.target.name;
    this.setState({ [field]: value, disabled: false });
  }

  handleChangeForCheckbox = (event) => {
    const field = event.target.name;
    this.setState({ [field]: event.target.checked, disabled: false });
  }

  onFileChange = (event) => {
    this.setState({ image_preview: URL.createObjectURL(event.target.files[0]), avatar: event.target.files[0], disabled: false });
  }

  renderSpinner() {
    return(
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    )
  }

  render(){
    return (
      <div className='align-text-center'>
        <div className='d-flex f-direction-col adaptive-width'>
          <SettingsFontSVG />
          <div>
            <input id='avatar-upload' type='file' accept="image/png, image/jpeg" onChange={this.onFileChange} />
            <div className='text-align-left'>
              <h2> YOUR PHOTO </h2>
              <p className='white-text-small no-margin'> USING FOR DISPLAYING YOUR PHOTO IN EACH GAME </p>
            </div>
            <div className='avatar-wrapper'>
              <label htmlFor='avatar-upload' className='avatar-upload-btn'>
                <UploadImageIconSVG />
              </label>
              <img className="profile-img" src={this.state.image_preview} />
            </div>
          </div>
          <div className='row-field'>
            <div className='personal-info-inputs'>
              <label className='label-input-settings' htmlFor="first-name-input">
                FIRST NAME
              </label>
              <input
                  className='name-input'
                  id='first-name-input'
                  maxLength="16"
                  name='first_name'
                  onChange={this.handleUpdateFields}
                  type='text'
                  value={this.state.first_name || undefined} />
            </div>
            <div className='personal-info-inputs'>
              <label className='label-input-settings' htmlFor="last-name-input">
                LAST NAME
              </label>
              <input
                  className='name-input'
                  id='last-name-input'
                  maxLength="20"
                  name='last_name'
                  onChange={this.handleUpdateFields}
                  type='text'
                  value={this.state.last_name || undefined} />
            </div>
          </div>
          <div className='text-align-left'>
            <h2 id="notif-settings-h2"> NOTIFICATIONS SETTING </h2>
            <div>
              <input
                  checked={this.state.notify_game_start}
                  className='notif-gm'
                  id='notif-gm-st'
                  name='notify_game_start'
                  onChange={this.handleChangeForCheckbox}
                  type='checkbox' />
              <label className='notify-gm' htmlFor='notif-gm-st'>NOTIFY ABOUT GAME START</label>
            </div>
            <div>
              <input
                  checked={this.state.notify_game_finish}
                  className='notif-gm'
                  id='notif-gm-fs'
                  name='notify_game_finish'
                  onChange={this.handleChangeForCheckbox}
                  type='checkbox' />
              <label className='notify-gm' htmlFor='notif-gm-fs'>NOTIFY ABOUT GAME FINISH</label>
            </div>
            <div>
              <input
                  checked={this.state.news}
                  className='notif-gm'
                  id='notif-gm-news'
                  name='news'
                  onChange={this.handleChangeForCheckbox}
                  type='checkbox' />
              <label className='notify-gm' htmlFor='notif-gm-news'>NEWS</label>
            </div>
          </div>
          <div className='d-flex f-direction-row top-btm-mar-30px double-link-btn-wrapper j-content-space-between'>
            <Link to='/'>
              <button
                  type='button'> BACK TO MENU </button>
            </Link>
            <button
                className='green-btn'
                style={{position: 'relative'}}
                disabled={this.state.disabled}
                onClick={this.handleSubmitSettings}
                type="button">SUBMIT CHANGES {this.state.showSpinner && this.renderSpinner()}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings
