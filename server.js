const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    axios = require('axios');
queryString = require('querystring');
require('dotenv').config();

// API keys and other important info for Spotify
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = 'http://localhost:5000/callback';
const scopes = 'user-read-private user-read-email playlist-read-collaborative playlist-modify-public user-top-read playlist-read-private user-read-recently-played user-library-read';
const stateKey = 'spotify_auth_state';

// Activating cross origin resource sharing and cookie parser
app.use(cors({
    origin: true,
    credentials: true
}))
    .use(cookieParser())

app.use('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    next();
})

// Writes to the terminal once the server is running
app.listen(port, () => console.log('Backend server live on ' + port));

// Message to display when starting the server
app.get('/', (req, res) => {
    res.send({ message: 'We did it!' });
});

// Generates random string containing numbers and letters
const generateRandomString = function (length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}


// Login endpoint for Spotify authentication
app.get('/login', function (req, res) {

    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    res.redirect('https://accounts.spotify.com/authorize?' +
        queryString.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scopes,
            redirect_uri: redirect_uri,
            state: state
        }));
});

// Application requests refresh and access tokens
app.get('/callback', function (req, res) {

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            queryString.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        axios.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                const access_token = body.access_token,
                    refresh_token = body.refresh_token;

                const options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // Use the access to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // Pass the token to the browser to make requests from there
                res.redirect('/#' +
                    queryString.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    queryString.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.get('/refresh_token', function (req, res) {

    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});