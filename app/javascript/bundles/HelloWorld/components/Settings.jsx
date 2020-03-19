import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react'

class Settings extends React.Component {
  render() {
    return (
      <div className="mm-list">
        <h1> KILLER </h1>
        <img src={this.props.dataFromParent}/>
        <Button id="mm-btn"><a href='/'>BACK</a></Button>
      </div>
    )
  }
}

export default Settings
