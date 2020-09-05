import React from 'react';
import { Link } from 'react-router-dom';

const YouWasKilled = () => {
  return (
    <div>
      <h1> KILLER </h1>
      <div className='mm-list' style={{width: '100%'}}>
        <div className='mm-list-waskilled'>
          <h2 className='big-header'> YOU WAS KILLED! </h2>
          <p className='white-text'> WE WILL SHOW YOU RESULTS AFTER GAME FINISHED </p>
        </div>
        <Link
            to='/'>
          <button
              id="mm-btn"
              type="button">
            BACK TO MENU
          </button>
        </Link>
      </div>
    </div>
  );
};

export default YouWasKilled;
