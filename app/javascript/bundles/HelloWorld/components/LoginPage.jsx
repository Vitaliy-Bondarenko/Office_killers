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
          style={{marginTop: '100px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'}}>
        <img id='google-logo-m' src='http://tiny.cc/gc2gnz' style={{marginRight: '6px'}} />
        SIGN IN WITH GOOGLE
      </a>
    </div>
  );
};

export default LoginPage;
