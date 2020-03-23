import React from 'react';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage'
import MainMenu from './MainMenu'
import Settings from './Settings'
import YouWasKilled from './YouWasKilled'
import JoinGameWithCode from './JoinGameWithCode'
import WaitingView from './WaitingView'
import StartGameWarn from './StartGameWarn'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import '../styles/office-killers'

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_user_id: props.id,
      first_name: props.first_name,
      last_name: props.last_name,
      image_URL: props.image_URL,
      loggedInStatus: !!props.id,
      notify_game_start: props.notify_game_start,
      notify_game_finish: props.notify_game_finish,
      news: props.news,
     };
  }

  updateName = (name) => {
    this.setState({ name });
  };

  render() {
    return (
      <Router>
        <Switch>
          <React.Fragment>
            <Container>
              {this.state.loggedInStatus ?
                (<Route path='/' exact component={MainMenu} />) :
                (<LoginPage/>)}
              <Route path='/settings' render={props =>
                                                      <Settings
                                                          imageProp={this.state.image_URL}
                                                          first_name={this.state.first_name}
                                                          last_name={this.state.last_name}
                                                          current_user_id={this.state.current_user_id}
                                                          notify_game_start={this.state.notify_game_start}
                                                          notify_game_finish={this.state.notify_game_finish}
                                                          news={this.state.news} />} />
              <Route path='/killed' component={YouWasKilled} />
              <Route path='/join_game' component={StartGameWarn} />
              <Route path='/waiting' component={WaitingView} />
            </Container>
          </React.Fragment>
        </Switch>
      </Router>
    );
  }
}
