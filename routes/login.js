const express = require('express');
const router = express.Router();
const config = require('../config');

router.get('/', (req, res) => {
    res.redirect(`${config.issuer}/authorize?client_id=${config.clientID}&redirect_uri=${config.redirectURI}&scope=${config.scopes}&response_type=code&state=fdgshdpguisjnvdjkfnvkj`);
});

module.exports = router;