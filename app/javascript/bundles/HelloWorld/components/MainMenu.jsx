import React from 'react';
import { Button, List, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      current_game: props.game,
      owner_id: props.owner_id,
      user_id: props.user_id
    };
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
      <div className='mm-list' style={{transform: 'scale(1.2) translate(0, 15%)'}}>
        <Container>
          <h1> KILLER </h1>
          <List>
            <List.Item>
              <Link
                  to='/game'>
                <Button id="mm-btn">
                  {this.handleGameButtonText()}</Button>
              </Link>
            </List.Item>
            { game.id && game.status != "finished" ?
              undefined :
              <List.Item>
                <Link to='/join_game'>
                  <Button id="mm-btn">JOIN GAME VIA CODE</Button>
                </Link>
              </List.Item> }
            <List.Item>
              <Link to='/tutorial'>
                <Button id="mm-btn">HOW TO PLAY</Button>
              </Link>
            </List.Item>
            {game && game.status == "finished" ?
              <List.Item>
                <Link to='/best_killer'>
                  <Button id="mm-btn">STATISTIC</Button>
                </Link>
              </List.Item> : undefined}
            <List.Item>
              <Link to='/settings'>
                <Button id="mm-btn">SETTINGS</Button>
              </Link>
            </List.Item>
            <List.Item>
              <input
                  id="mm-btn-red"
                  onClick={() => window.location.href="/logout"}
                  type="button"
                  value="LOGOUT" />
            </List.Item>
          </List>
        </Container>
      </div>
    );
  }
}

export default MainMenu;
