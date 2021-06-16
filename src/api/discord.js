const express = require('express');
const fetch = require('node-fetch');
// base64 dla env
const btoa = require('btoa');
const { catchAsync } = require('../server/utils');
const router = express.Router();

const CLIENT_ID = '123';
const CLIENT_SECRET = 'xX_x-Xx-';
const GUILD_ID = '12345';


const redirect = encodeURIComponent('http://localhost:3000/api/discord/callback');

router.get('/login', (req, res) => {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds&response_type=code&redirect_uri=${redirect}`);
});


router.get('/callback', catchAsync(async (req, res) => {
  let sess = req.session;
  if (!req.query.code) throw new Error('NoCodeProvided');
  const code = req.query.code;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`,
      },
    });
  const json = await response.json();

  // get user info
  const fetchDiscordUserInfo = await fetch('http://discordapp.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${json.access_token}`,
    }
  });
  const userInfo = await fetchDiscordUserInfo.json();

  // get user info
  const fetchDiscordUserInfoGuilds = await fetch('http://discordapp.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${json.access_token}`,
    }
  });
  const userInfoGuilds = await fetchDiscordUserInfoGuilds.json();
  const resultGuild = userInfoGuilds.find(({ id }) => id === GUILD_ID);
  let guildConnected = true;

  //literały i18next 
  // resultGuild.name, resultGuild.icon
  if (resultGuild === undefined) guildConnected = false;
  console.log('user: ' + userInfo.username);
  if (userInfo.username) {
    sess.logged = true;
    sess.name = userInfo.username;
    sess.uId = userInfo.id;
    sess.avatar = userInfo.avatar;
    sess.discriminator = userInfo.discriminator;
  }
  //sess.logged = true;
  console.log('logged sess ' + sess.logged);
  console.log('req logged ' + req.session.logged);

  //TODO cookie/async
  res.redirect(`/?token=${json.access_token}&name=${userInfo.username}&id=${userInfo.id}&avatar=${userInfo.avatar}&discriminator=${userInfo.discriminator}`);
}));



module.exports = router;