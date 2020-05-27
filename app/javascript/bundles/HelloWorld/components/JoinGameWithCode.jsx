import React from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import requestmanager from '../../lib/requestmanager';
import {store} from 'react-notifications-component';

class JoinGameWithCode extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: [],
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
        <Card className='card-center'>
          <div className='float-right'>
            <a className='corner-close' href='/'>
              <Icon name='close' />
            </a>
          </div>
          <div className='small-padding'>
            <h3>ENTER INVITE CODE HERE</h3>
          </div>
          <div className='vertical-align'>
            <input
                className='input-code-join'
                maxLength="6"
                onChange={(e) => this.updateCode(e.target.value)}
                type='text'
                value={this.state.code || ''} />
            <Button
                id="button-small-green"
                onClick={this.handleFindGameByCode}>JOIN</Button>
          </div>
        </Card>
      </div>
    );
  }
}

export default JoinGameWithCode;
