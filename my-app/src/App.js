import React from 'react';
import './App.css';
import Search from './components/Search';
import Axios from 'axios';
import Login from './components/Login';

function App() {
  Axios({
    method: 'GET',
    url: 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    console.log(res.data.message);
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Spotify Customizer</h1>
        <Login />
      </header>
    </div>
  );
}

export default App;
