import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class CreateGame extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      start_time: props.start_time
     };
  }

  render(){
    return(
      <div className='mm-list'>
        <h1> KILLER </h1>
      </div>
    )
  }
}

export default CreateGame
