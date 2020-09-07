import React from 'react';

const LoginPage = () => {
  return (
    <div className='mm-list'>
      <h1
          className='login-font'
          style={{marginTop: '-25%', marginBottom: '20px'}}> KILLER </h1>
      <a
          className='button-small-padding'
          href='/login'
          style={{display: 'block',
                  margin: '100px 0 20px 0',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'}}>
        <img id='google-logo-m' src='http://tiny.cc/gc2gnz' style={{marginRight: '6px'}} />
        SIGN IN WITH GOOGLE
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
