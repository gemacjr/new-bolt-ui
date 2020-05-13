const express = require('express');
const session = require('express-session');
const config = require('./config');


const app = express();
app.use(express.json());

app.use(session(
    {
        secret: '1fgdsldskgeis',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: 'auto',
            httpOnly: true,
            maxAge: 360000
        }
    }
));

app.use('/user', require('./routes/user'));

// use routes
app.use('/user', require('./routes/user'));
app.use('/', require('./routes/login'));
app.use('/auth/oauth2/callback', require('./routes/oauth-callback'));
app.use('/secured', express.static('react-app/build'));
app.use('/logout', require('./routes/logout'));
app.use('/set-user-data', require('./routes/set-user-data'));

// start server

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`FusionAuth example app listening on port ${port}.`));