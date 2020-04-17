import React from 'react';
import { Button } from 'semantic-ui-react';

const LoginPage = () => {
  return (
    <div className='mm-list'>
      <h1> KILLER </h1>
      <p>
        <Button id='google-log-btn'>
          <img id='google-logo-m' src='https://shorturl.at/fCKLX' />
          <a className='buttonH' href='/login'> SIGN IN WITH GOOGLE </a>
        </Button>
      </p>
    </div>
  );
};

export default LoginPage;
