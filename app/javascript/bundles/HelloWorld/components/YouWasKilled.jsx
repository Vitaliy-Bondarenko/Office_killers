import React from 'react';
import { KillerFontSVG } from './icons.js';
import { Link } from 'react-router-dom';

const YouWasKilled = () => {
  return (
    <div className='absolute-center align-text-center width-92'>
      <div style={{width: '80%', maxWidth: '350px'}}>
        <KillerFontSVG />
      </div>
      <div className='width-100'>
        <div>
          <h2 className='big-header'> YOU WAS KILLED! </h2>
          <p className='white-text small-text' style={{marginTop: '4px'}}> WE WILL SHOW YOU RESULTS AFTER GAME FINISHED </p>
        </div>
        <Link
            to='/'>
          <button
              className="default-btn"
              type="button">
            BACK TO MENU
          </button>
        </Link>
      </div>
    </div>
  );
};

export default YouWasKilled;
