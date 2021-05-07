const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'code-forum',
    // todo change secret before deployment
    secret: 'something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 10)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);
});