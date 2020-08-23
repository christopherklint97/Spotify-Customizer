const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    cors = require('cors'),
    axios = require('axios');
require('dotenv').config();

// Activating cross origin resource sharing
app.use(cors());

// Writes to the terminal once the server is running
app.listen(port, () => console.log('Backend server live on ' + port));

// API keys and other important info for Spotify
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/callback';
const scopes = 'user-read-private user-read-email playlist-read-collaborative playlist-modify-public user-top-read playlist-read-private user-read-recently-played user-library-read';
const url = 'https://accounts.spotify.com/authorize'

// Message to display when starting the server
app.get('/', (req, res) => {
    res.send({ message: 'We did it!' });
});

// Login endpoint for Spotify authentication
app.get('/login', function (req, res) {
    res.redirect(url + '?response_type=code' + '&client_id=' + client_id + (scopes ? '&scope=' + encodeURIComponent(scopes) : '') + '&redirect_uri=' + encodeURIComponent(redirect_uri));
});