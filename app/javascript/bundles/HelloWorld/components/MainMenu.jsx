import React from 'react';
import { Button, List, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: props.game
    };
  }

  render(){
    const game = this.state.game || {};
    return (
      <div className='mm-list'>
        <Container>
          <h1> KILLER </h1>
          <List>
            <List.Item>
              <Link to='/game'>
                <Button id="mm-btn">
                  { game ?
                                    'START NEW GAME' :
                                    'CREATE NEW GAME' }</Button>
              </Link>
            </List.Item>
            { this.state.game ?
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
              <a className='buttonH' href='/logout'>LOGOUT</a>
            </List.Item>
          </List>
        </Container>
      </div>
    );
  }
}

export default MainMenu;
