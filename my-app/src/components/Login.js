import React from 'react';
import './Login.css';

const axios = require('axios').default;

function Login() {

  function loginToSpotify() {
    axios.get('/login')
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="Login">
      <button className="Login-button">Login to Spotify</button>
    </div>
  );
}

export default Login;
