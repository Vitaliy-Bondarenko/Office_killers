import React from 'react';
import requestmanager from '../../lib/requestmanager';
import QrReader from "react-qr-reader";
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

  handleScan(data) {
    if (data) {
      window.location = data;
    }
  }

  handleFindGameByCode = () => {
    const params = { game: { code: this.state.code }};
    const url = '/api/v1/players';
    requestmanager.request(url, 'post', params).then((resp) => {
      if (resp.status == "conflict"){
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
        window.location.href = '/game';
      }
    }).catch();
  }

  render(){
    return (
      <div className='join-by-code'>
        <div className='card-center'>
        <h2 className='scan-qr-code-text'>SCAN GAME QR CODE</h2>
          <QrReader
                bgColor='black'
                fgColor='white'
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: "100%", zIndex: '-1' }} />
          <Link className='corner-close' to='/'>
            <CloseSVG />
          </Link>
          <div className='small-padding'>
            <h2 style={{fontWeight: '300', color: 'black'}}>ENTER INVITE CODE HERE</h2>
          </div>
          <div className='vertical-align d-flex j-content-center'>
            <input
                className='input-code-join'
                maxLength="6"
                onChange={(e) => this.updateCode(e.target.value)}
                type='text'
                value={this.state.code || ''} />
            <button
                className="button-small-green"
                onClick={this.handleFindGameByCode}
                type='button'>JOIN</button>
          </div>
        </div>
      </div>
    );
  }
}

export default JoinGameWithCode;
