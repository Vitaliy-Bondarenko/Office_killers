import React from 'react';
import PropTypes from 'prop-types';
import LoginPage from './LoginPage'
import MainMenu from './MainMenu'
import Settings from './Settings'
import YouWasKilled from './YouWasKilled'
import JoinGameWithCode from './JoinGameWithCode'
import WaitingView from './WaitingView'
import StartGameWarn from './StartGameWarn'
import FormGame from './FormGame'
import ReactNotification from 'react-notifications-component';
import {store} from 'react-notifications-component';
import 'animate.css'
import 'react-notifications-component/dist/theme.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import '../styles/office-killers'

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: props.user_id,
      first_name: props.first_name,
      last_name: props.last_name,
      image_URL: props.image_URL,
      loggedInStatus: !!props.user_id,
      notify_game_start: props.notify_game_start,
      notify_game_finish: props.notify_game_finish,
      news: props.news,
      owner_id: props.owner_id,
      current_game: props.current_game,
      current_player: props.current_player
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
              <div className="app-container">
                <ReactNotification />
              </div>
              {this.state.loggedInStatus ?
                (<Route path='/' exact render={props=>
                                                      <MainMenu
                                                         game={this.props.current_game} />} />) :
                (<LoginPage/>)}
              <Route path='/settings' render={props =>
                                                      <Settings
                                                          imageProp={this.state.image_URL}
                                                          first_name={this.state.first_name}
                                                          last_name={this.state.last_name}
                                                          user_id={this.state.user_id}
                                                          notify_game_start={this.state.notify_game_start}
                                                          notify_game_finish={this.state.notify_game_finish}
                                                          news={this.state.news} />} />
              <Route path='/killed' component={YouWasKilled} />
              <Route path='/join_game' render={props =>
                                                     <JoinGameWithCode
                                                         />} />
              <Route path='/waiting' component={WaitingView} />
              <Route path='/connect' render={props =>
                                                     <FormGame
                                                          game={this.state.current_game}
                                                          current_user={this.state.user_id}
                                                          owner_id={this.state.owner_id}
                                                          current_player={this.state.current_player} />} />
            </Container>
          </React.Fragment>
        </Switch>
      </Router>
    );
  }
}
