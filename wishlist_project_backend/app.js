const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('connect-flash');
const flash = require('connect-flash');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');
const db = require('./models');
const app = express();

require('dotenv').config();

const usersRouter = require('./routes/users');

db.sequelize.authenticate()
.then(async()=>{
    console.log('db connect ok');
    await db.sequelize.sync({force: false});
})
.catch(err=>{
    console.error(err);
})
passportConfig(passport);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(cors());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', usersRouter);

module.exports = app;