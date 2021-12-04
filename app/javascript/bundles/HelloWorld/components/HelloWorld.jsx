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
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HowToPlay from './HowToPlay';

export default class HelloWorld extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_user: props.current_user,
      current_game: props.current_game,
      current_player: props.current_player,
     };

     window.updatePlayerIndividually = this.updatePlayerIndividually.bind(this);
  }

  updatePlayerIndividually = (current_game, current_player) => {
    this.setState({ current_game, current_player });
  }

  handleGameProps = () => {
    const { current_game, current_player, current_user } = this.state;
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
        return this.gameComponent();
      } else {
        if (current_player.current_game_owner){
          return this.gameComponent();
        } else {
          return (_props =>
          (<WaitingView
              current_player={current_player}
              current_user={current_user}
              current_game={current_game} />));
        }
      }
    } else {
      return this.gameComponent();
    }
  }

  gameComponent = () => {
    const { current_player, current_user, current_game } = this.state;
    return (_props =>
      (<FormGame
        current_player={current_player}
        current_user={current_user}
        current_game={current_game} />));
  }

  render() {
    const { current_user, current_game } = this.state;
    const current_player = this.state.current_player || {};
    const game = this.state.current_game || {};
    const check_game_pending = !current_game || game.status == "finished";
    return (
      <Router>
        <div>
          <div className="app-container">
            <ReactNotification />
          </div>
          { current_user ?
            (<Switch>
              <Route
                  exact path='/' render={_props=>
                  (<MainMenu
                      game={current_game}
                      owner_id={current_user.owner_id}
                      user_id={current_user.id} />)} />
              <Route
                exact path='/tutorial' render={_props=>
                  (<HowToPlay />)} />
              <Route
                  path='/settings' render={_props =>
                  (<Settings
                      first_name={current_user.first_name}
                      avatar={current_user.avatar}
                      last_name={current_user.last_name}
                      news={current_user.news}
                      notify_game_finish={current_user.notify_game_finish}
                      notify_game_start={current_user.notify_game_start}
                      user_id={current_user.id} />)} />
              <Route component={YouWasKilled} path='/killed' />
              <Route exact path='/join_game' >
                {check_game_pending ? <JoinGameWithCode /> : <Redirect to='/game' />}
              </Route>
              <Route exact
                      path='/confirm'>
                  {current_player.current_game_owner &&
                   current_game.players.length > 2 && game.status == "unstarted" ?
                      current_game.status == 'unstarted' && <StartGameWarn
                          current_game={current_game}
                          current_player={current_player} /> : <Redirect to='/game' />}
                </Route>
              <Route
                  path='/statistic' render={game.status == "finished" ?
                       (_props =>
                         (<StatisticPage
                             current_player={current_player} />)) : undefined} />
              <Route
                  path='/best_killer' render={game.status == "finished" ?
                       (_props =>
                         (<BestKiller
                             current_game={current_game}
                             current_player={current_player} />)) : undefined} />
              <Route
                  path='/game' render={this.handleGameProps()} />
            </Switch>) : (<LoginPage />) }
        </div>
      </Router>
    );
  }
}
