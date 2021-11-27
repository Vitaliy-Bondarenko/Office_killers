import React from 'react';
import { KillerFontSVG, GoogleIconSVG } from './icons.js';

const LoginPage = () => {
  return (
    <div className='absolute-center align-text-center' style={{top: '44%', width: 'min-content'}}>
      <KillerFontSVG />
      <div className='d-flex f-direction-col align-items-center login-btns-wrapper ' style={{marginTop: '30px'}}>
        <a
            className='login-btn'
            href='/login'>
          <div id='google-logo'>
            <GoogleIconSVG />
          </div>
          <p>SIGN IN WITH GOOGLE</p>
        </a>
        <a
            className='login-btn guest-btn'
            href='/guest_login'>
          PLAY AS GUEST
        </a>
      </div>
    </div>
  );
};

export default LoginPage;
