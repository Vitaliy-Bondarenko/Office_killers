import React from 'react';

const LoginPage = () => {
  return (
    <div className='mm-list' style={{top: '44%'}}>
      <h1
          className='login-font'
          style={{marginBottom: '20px'}}> KILLER </h1>
      <a
          className='login-btn'
          href='/login'>
        <img id='google-logo-m' src='http://tiny.cc/gc2gnz' style={{marginRight: '6px'}} />
        <p>SIGN IN WITH GOOGLE</p>
      </a>
      <a
          className='button-small-padding'
          href='/guest_login'
          style={{marginTop: '10px',
                  color: '#5d5d5d',
                  fontSize: '20px',
                  padding: '5px 15px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'}}>
        PLAY AS GUEST
      </a>
    </div>
  );
};

export default LoginPage;
