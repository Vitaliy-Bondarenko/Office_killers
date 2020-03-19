import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

const LoginPage = () => {
  return (
    <div className='mm-list'>
      <h1> KILLER </h1>
      <p>
        <Button id='google-log-btn'><img id='google-logo-m' src='https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png'/><a href='/login'> SIGN IN WITH GOOGLE </a></Button>
      </p>
    </div>
  )
}

export default LoginPage
