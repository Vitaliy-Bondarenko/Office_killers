import React from 'react';
import requestmanager from '../../lib/requestmanager';
import {store} from 'react-notifications-component';
import { Link } from 'react-router-dom';
import { CloseSVG } from './icons.js';

class JoinGameWithCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      errorMessage: ''
    };
  }

  updateCode = (code) => {
    this.setState({ code });
  }

  handleFindGameByCode = () => {
    const params = { game: { code: this.state.code }};
    const url = '/api/v1/players';
    requestmanager.request(url, 'post', params).then((resp) => {
      if (resp.status == "conflict"){
        console.log("uncorrect!");
        store.addNotification({
          message: "WRONG CODE!",
          type: "danger",
          container: "top-right",
          insert: "top",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],

          dismiss:{
            duration: 3500,
            onScreen: true
          },
        });
      } else {
        window.location = '/game';
      }
    }).catch(err => console.log(err));
  }

  render(){
    return (
      <div className='join-by-code'>
        <div className='card-center'>
          <Link className='corner-close' to='/'>
            <CloseSVG />
          </Link>
          <div className='small-padding'>
            <h2 style={{fontWeight: '300', color: 'black'}}>ENTER INVITE CODE HERE</h2>
          </div>
          <div className='vertical-align' style={{display: 'flex', justifyContent: 'center'}}>
            <input
                className='input-code-join'
                maxLength="6"
                onChange={(e) => this.updateCode(e.target.value)}
                type='text'
                value={this.state.code || ''} />
            <button
                id="button-small-green"
                onClick={this.handleFindGameByCode}
                type='button'>JOIN</button>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinGameWithCode;
