import React from 'react';
import LoginPage from './LoginPage';
import MainMenu from './MainMenu';
import Settings from './Settings';
import YouWasKilled from './YouWasKilled';
import JoinGameWithCode from './JoinGameWithCode';
import WaitingView from './WaitingView';
import FormGame from './FormGame';
import TargetScreen from './TargetScreen';
import StatisticPage from './StatisticPage';
import StartGameWarn from './StartGameWarn';
import ReactNotification from 'react-notifications-component';
import 'animate.css';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import '../styles/office-killers';

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
    const { loggedInStatus, owner_id, user_id, current_game } = this.state;
    return (
      <Router>
        <Container>
          <div className="app-container">
            <ReactNotification />
          </div>
          { loggedInStatus ?
            (<Switch>
              <Route
                  exact path='/' render={_props=>
                  (<MainMenu
                      game={this.state.current_game} />)} />
              <Route
                  path='/settings' render={_props =>
                  (<Settings
                      first_name={this.state.first_name}
                      imageProp={this.state.image_URL}
                      last_name={this.state.last_name}
                      news={this.state.news}
                      notify_game_finish={this.state.notify_game_finish}
                      notify_game_start={this.state.notify_game_start}
                      user_id={this.state.user_id} />)} />
              <Route component={YouWasKilled} path='/killed' />
              <Route component={JoinGameWithCode} path='/join_game' />
              {owner_id == user_id && current_game.players.length > 2 &&
                <Route
                    path='/confirm' render={_props =>
                       (<StartGameWarn
                           current_game={this.state.current_game} />)} />}
              <Route component={WaitingView} path='/waiting' />
              <Route component={TargetScreen} path='/tutorial' />
              <Route component={StatisticPage} path='/statistic' />
              <Route
                  path='/game' render={_props =>
                  (<FormGame
                      current_player={this.state.current_player}
                      current_user={this.state.user_id}
                      game={this.state.current_game}
                      owner_id={this.state.owner_id} />)} />
            </Switch>) : (<LoginPage />) }
        </Container>
      </Router>
    );
  }
}
