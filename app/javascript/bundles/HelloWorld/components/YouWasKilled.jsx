import React from 'react';
import { Button } from 'semantic-ui-react';

const YouWasKilled = () => {
  return (
    <div className='mm-list'>
      <h1> KILLER </h1>
      <div className='mm-list-waskilled'>
        <h2 className='big-header'> YOU WAS KILLED! </h2>
        <p className='white-paragraph'> WE WILL SHOW YOU RESULTS AFTER GAME FINISHED </p>
      </div>
      <Button id="mm-btn-right-margin"><a href='/'>BACK TO MENU</a></Button>
    </div>
  );
};

export default YouWasKilled;
