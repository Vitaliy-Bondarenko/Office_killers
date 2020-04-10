import React, { Component } from 'react';
import { Button, List, Container } from 'semantic-ui-react'
import { Link, BrowserRouter as Router } from 'react-router-dom'

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      game: !!props.game,
      current_game: props.game
    }
  }

  render(){
    const game = this.state.current_game || {}
    return (
      <div className='mm-list'>
        <Container>
          <h1> KILLER </h1>
          <List>
            <List.Item>
              <Link to='/connect'>
                <Button id="mm-btn">
                  {this.state.game ?
                                    'START NEW GAME' :
                                    'CREATE NEW GAME' }</Button>
              </Link>
            </List.Item>
            {this.state.game ?
              null : <List.Item>
                        <Link to='/join_game'>
                          <Button id="mm-btn">JOIN GAME VIA CODE</Button>
                        </Link>
                      </List.Item> }
            <List.Item>
              <Button id="mm-btn">HOW TO PLAY</Button>
            </List.Item>
            <List.Item>
              <Button id="mm-btn">STATISTIC</Button>
            </List.Item>
            <List.Item>
              <Link to='/settings'>
                <Button id="mm-btn">SETTINGS</Button>
              </Link>
            </List.Item>
            <List.Item style={{marginTop: "20px"}}>
              <a href='/logout' className='buttonH'>LOGOUT</a>
            </List.Item>
          </List>
        </Container>
      </div>
    )
  }
}

export default MainMenu
