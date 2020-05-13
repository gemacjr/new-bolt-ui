const express = require('express');
const router = express.Router();
const request = require('request');
const jwtDecoder = require('jwt-decode');
const config = require('../config');

router.get('/', (req, res) => {
    request(
        {
            method: 'POST',
            uri: `${config.issuer}/oauth2/default/v1/token`,
            form : {
                'client_id': config.clientID,
                'client_secret': config.clientSecret,
                'code': req.query.code,
                'grant_type': 'authorization_code',
                'redirect_uri': config.redirectURI
            }
        },

        (error, response, body) => {
            req.session.token = JSON.parse(body).access_token;
            console.log(JSON.parse(body));

            const accessToken = JSON.parse(body).access_token;
            const decodedAccessToken = jwtDecoder(accessToken);
            const cookieOptions = {
                maxAge: 360000
            };

            res.cookie('aep', accessToken, cookieOptions);

            // redirect to the react app
            res.redirect('/secured');
        }
    );
});

module.exports = router;