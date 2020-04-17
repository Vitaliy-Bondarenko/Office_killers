import React from 'react';
import { Button } from 'semantic-ui-react';

const WaitingView = () => {
  return(
    <div className='mm-list-small-padding'>
      <h1> KILLER </h1>
      <div className='mm-list-waskilled'>
        <p className='medium-text'> YOUR GAME IS UNSTARTED. WAITING FOR ALL PLAYERS TO CONNECT</p>
        <div className='horizontal-line'> <hr /> </div>
        <p className='small-text'> WE WILL NOTIFY YOU WHEN GAME START </p>
      </div>
      <Button id="mm-btn-right-margin"><a href='/'>BACK TO MENU</a></Button>
    </div>
  );
};

export default WaitingView;
