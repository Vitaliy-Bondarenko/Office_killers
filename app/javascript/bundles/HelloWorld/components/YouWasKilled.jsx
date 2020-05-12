import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const YouWasKilled = () => {
  return (
    <div className='mm-list'>
      <h1> KILLER </h1>
      <div className='mm-list-waskilled'>
        <h2 className='big-header'> YOU WAS KILLED! </h2>
        <p className='white-paragraph'> WE WILL SHOW YOU RESULTS AFTER GAME FINISHED </p>
      </div>
      <Link
          to='/'>
        <Button id="mm-btn-right-margin">
          BACK TO MENU
        </Button>
      </Link>
    </div>
  );
};

export default YouWasKilled;
