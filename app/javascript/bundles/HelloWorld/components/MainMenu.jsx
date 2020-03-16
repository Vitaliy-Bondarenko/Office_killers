import React, { Component } from 'react';
import { Button, List, Container } from 'semantic-ui-react'
import '../styles/office-killers'

const MainMenu = () => {
  return (
    <div className='mm-list'>
      <Container>
        <h1> KILLER </h1>
        <List>
          <List.Item>
            <Button id="mm-btn">CREATE NEW GAME</Button>
          </List.Item>
          <List.Item>
            <Button id="mm-btn">JOIN GAME VIA CODE</Button>
          </List.Item>
          <List.Item>
            <Button id="mm-btn">HOW TO PLAY</Button>
          </List.Item>
          <List.Item>
            <Button id="mm-btn">STATISTIC</Button>
          </List.Item>
          <List.Item>
            <Button id="mm-btn"><a href='settings'>SETTINGS</a></Button>
          </List.Item>
          <List.Item>
            <Button id="mm-btn-logout"><a href='/logout'> LOGOUT </a></Button>
          </List.Item>
        </List>
      </Container>
    </div>
  )
}

export default MainMenu
