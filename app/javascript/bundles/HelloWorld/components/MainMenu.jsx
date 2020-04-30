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
        }else{
          return "RETURN TO GAME";
        }
      }else{
        return "RETURN TO GAME";
      }
    }else{
      return "CREATE NEW GAME";
    }
  }

  render(){
    const game = this.state.current_game || {};
    return (
      <div className='mm-list'>
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
            { game.id ?
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
            <List.Item>
              <Link to='/statistic'>
                <Button id="mm-btn">STATISTIC</Button>
              </Link>
            </List.Item>
            <List.Item>
              <Link to='/settings'>
                <Button id="mm-btn">SETTINGS</Button>
              </Link>
            </List.Item>
            <List.Item style={{marginTop: "20px"}}>
              <a className='buttonH' href='/logout' style={{textDecoration: "none"}}>LOGOUT</a>
            </List.Item>
          </List>
        </Container>
      </div>
    );
  }
}

export default MainMenu;
