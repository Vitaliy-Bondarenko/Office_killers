import React from 'react';
import { Link } from 'react-router-dom';
import { messaging } from './firebase.js';
import { KillerFontSVG } from './icons.js';
import requestmanager from "../../lib/requestmanager";

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_game: props.game,
      owner_id: props.owner_id,
      user_id: props.user_id
    };
  }

  componentDidMount(){
    if (messaging){
      messaging.requestPermission().then(() => {
        return messaging.getToken();
      }).then(token => {
        if (token){
          const url = '/api/v1/users/' + this.state.user_id;
          const params = { user: { notif_token: token } };
          requestmanager.request(url, "put", params).then((_resp) => {
           }).catch(() => {});
        }
      });
    }
  }

  handleGameButtonText = () => {
    const { owner_id, user_id, current_game} = this.state;
    if (current_game){
      if (current_game.status == "unstarted"){
        if (owner_id == user_id){
          return "START GAME";
        } else {
          return "RETURN TO GAME";
        }
      } else if(current_game.status == "in_progress") {
        return "RETURN TO GAME";
      } else if(current_game.status == "finished") {
        return "CREATE NEW GAME";
      }
    } else {
      return "CREATE NEW GAME";
    }
  }

  render(){
    const game = this.state.current_game || {};
    return (
      <div className='mm-list flex-main-menu-list' style={{width: 'min-content'}}>
        <KillerFontSVG />
        <Link
            style={{marginTop: '10px'}}
            to='/game'>
          <button
              className="mm-btn"
              type="button">
            {this.handleGameButtonText()}</button>
        </Link>
        { game.id && game.status != "finished" ?
            undefined :
            <Link to='/join_game'>
              <button
                  className="mm-btn"
                  type="button">JOIN GAME VIA CODE</button>
            </Link> }
        <Link to='/'>
          <button
              className="mm-btn"
              disabled
              type="button">HOW TO PLAY</button>
        </Link>
        {game && game.status == "finished" ?
          <Link to='/best_killer'>
            <button
                className="mm-btn"
                type="button">STATISTIC</button>
          </Link> : undefined }
        <Link to='/settings'>
          <button
              className="mm-btn"
              type="button">SETTINGS</button>
        </Link>
        <button
            id="mm-btn-red"
            onClick={() => window.location.href="/logout"}
            style={{margin: '4px'}}
            type="button">
              LOGOUT
        </button>
      </div>
    );
  }
}

export default MainMenu;
