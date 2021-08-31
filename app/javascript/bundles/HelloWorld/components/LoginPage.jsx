import React from 'react';

const LoginPage = () => {
  return (
    <div className='mm-list' style={{top: '44%'}}>
      <h1
          className='login-font'
          style={{marginBottom: '20px'}}> KILLER </h1>
      <div class='login-btns-wrapper'>
        <a
            className='login-btn'
            href='/login'>
          <img id='google-logo-m' src='http://tiny.cc/gc2gnz' style={{marginRight: '6px'}} />
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
