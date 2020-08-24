import React from 'react';
import './Login.css';

function Login() {

  return (
    <div className="Login">
      <a href='http://localhost:5000/login'>
        <button className="Login-button">Login to Spotify</button>
      </a>
    </div>
  );
}

export default Login;
