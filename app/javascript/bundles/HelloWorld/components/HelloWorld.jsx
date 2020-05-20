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
import BestKiller from './BestKiller';
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

  handleGameProps = () => {
    const { user_id, current_game, current_player, current_user } = this.state;
    if (current_game){
      if (current_game.status == "in_progress"){
        if (current_player.status == "dead"){
          return (_props =>
          (<YouWasKilled />));
        } else {
          return (_props =>
          (<TargetScreen
              current_player={current_player} />));
        }
      } else if (current_game.status == "finished") {
        return (_props =>
          (<FormGame
              current_player={current_player}
              current_user={user_id}
              game={current_game} />));
      } else {
        if (current_player.current_game_owner){
          return (_props =>
          (<FormGame
              current_player={current_player}
              current_user={user_id}
              game={current_game} />));
        } else {
          return (_props =>
          (<WaitingView
              current_player={current_player}
              current_user={current_user}
              game={current_game} />));
        }
      }
    } else {
      return (_props =>
      (<FormGame
          current_player={current_player}
          current_user={user_id}
          game={current_game} />));
    }
  }

  render() {
    const { loggedInStatus, owner_id, user_id, current_game, current_player } = this.state;
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
                      game={current_game}
                      owner_id={owner_id}
                      user_id={user_id} />)} />
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
              <Route
                  component={!current_game || current_game.status == "finished" ?
                                  JoinGameWithCode : undefined} path='/join_game' />
              {current_player.current_game_owner &&
                current_game.players.length > 2 && current_game.status == "unstarted" &&
                <Route
                    path='/confirm' render={_props =>
                       (<StartGameWarn
                           current_game={this.state.current_game} />)} />}
              <Route
                  path='/statistic' render={current_game.status == "finished" ?
                       (_props =>
                         (<StatisticPage
                             current_player={current_player} />)) : undefined} />
              <Route
                  path='/best_killer' render={current_game.status == "finished" ?
                       (_props =>
                         (<BestKiller
                             current_game={current_game}
                             current_player={current_player} />)) : undefined} />
              <Route
                  path='/game' render={this.handleGameProps()} />
            </Switch>) : (<LoginPage />) }
        </Container>
      </Router>
    );
  }
}
