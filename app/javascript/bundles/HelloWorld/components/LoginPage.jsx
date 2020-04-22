import React from 'react';

const LoginPage = () => {
  return (
    <div className='mm-list'>
      <h1 style={{marginBottom: '60px'}}> KILLER </h1>
      <a className='button-small-padding' href='/login' style={{marginTop: '100px'}, {textDecoration: 'none'}}>
        <img id='google-logo-m' src='http://tiny.cc/gc2gnz' style={{marginRight: '6px'}} />
        <strong>SIGN IN WITH GOOGLE</strong>
      </a>
    </div>
  );
};

export default LoginPage;
