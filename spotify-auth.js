const express = require('express');
const querystring = require('querystring');
const axios = require('axios');

const app = express();

const CLIENT_ID = '84bb9e98f0ff4a53a93c78b9f2d4d34c';
const CLIENT_SECRET = '5eb8457a1f084400b94f61712a2b0235';
const REDIRECT_URI = 'http://localhost:8888/callback';

app.get('/login', (req, res) => {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: 'user-read-currently-playing user-top-read',
      redirect_uri: REDIRECT_URI,
    }));
});

app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI
      }),
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response.status === 200) {
      const { access_token, refresh_token } = response.data;
      res.send(`Refresh Token: ${refresh_token}`);
    } else {
      res.send('There was an error during the authentication');
    }
  } catch (error) {
    res.send('There was an error during the authentication');
  }
});

app.listen(8888, () => {
  console.log('Listening on 8888');
});

