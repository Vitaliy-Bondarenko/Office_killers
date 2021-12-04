import React from 'react';
import { KillerFontSVG } from './icons.js';
import text from './how_to_play.js';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';

const HowToPlay = () => {
  return (
    <div className='absolute-center align-text-center width-92'>
      <div style={{width: '80%', maxWidth: '280px'}}>
        <KillerFontSVG />
      </div>
      <div className='rule-wrapper'>
        {text.map((single_block) =>
          (
            <fieldset key={single_block.id}>
              <legend> {single_block.legend} </legend>
              <p> {Parser(single_block.body)} </p>
            </fieldset>
          )
        )}
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
  );
};

export default HowToPlay;
