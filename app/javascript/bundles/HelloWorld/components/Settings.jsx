import React from 'react';
import requestmanager from "../../lib/requestmanager";
import { store } from 'react-notifications-component';
import { Link } from 'react-router-dom';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

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
      news: props.news,
      disabled: true
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
                      news: resp.news
                     });
    }).catch(() => {});
  }

  handleSubmitSettings = () => {
    const params = { user: { first_name: this.state.first_name,
                             last_name: this.state.last_name,
                             notify_game_start: this.state.notify_game_start,
                             notify_game_finish: this.state.notify_game_finish,
                             news: this.state.news,
                             image_URL: this.state.image_URL} };
    const url = "/api/v1/users/" + this.state.user_id;
    requestmanager.request(url, "put", params).then((resp) => {
      if (resp.status == 'success'){
        this.setState({ disabled: true });
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
    console.log(event.target.checked);
    this.setState({ [field]: event.target.checked, disabled: false });
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
                  name='first_name'
                  onChange={this.handleUpdateFields}
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
                  name='last_name'
                  onChange={this.handleUpdateFields}
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
                  name='notify_game_start'
                  onChange={this.handleChangeForCheckbox}
                  type='checkbox' />
              <label className='notify-gm' htmlFor='notif-gm-st'>NOTIFY ABOUT GAME START</label><br />
            </div>
            <div>
              <input
                  checked={this.state.notify_game_finish}
                  className='notif-gm'
                  id='notif-gm-fs'
                  name='notify_game_finish'
                  onChange={this.handleChangeForCheckbox}
                  type='checkbox' />
              <label className='notify-gm' htmlFor='notif-gm-fs'>NOTIFY ABOUT GAME FINISH</label><br />
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
        </div>
        <div style={{margin: '30px 0 30px 0'}}>
          <Link to='/'>
            <input
                id="mm-btn-settings"
                style={{backgroundColor: 'white', border: '0.2em solid white'}}
                type='button'
                value='BACK TO MENU' />
          </Link>
          <button
              id="mm-btn-settings"
              disabled={this.state.disabled}
              onClick={this.handleSubmitSettings}
              style={{backgroundColor: '#a8f7a8', border: '0.2em solid #a8f7a8'}}
              type="button">SUBMIT CHANGES</button>
        </div>
      </div>
    );
  }
}

export default Settings;
