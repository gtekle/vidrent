// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const mongoose = require('mongoose');


mongoose.connect(config.get('db.url'))
    .then(() => console.log("Connected to mongodb..."))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const genresRouter = require('./src/routes/router.genres');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// startupDebugger('Application Name: ', config.get('name'));
// startupDebugger('Mail Password: ', config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan is enabled...');
}

app.use('/api/genres', genresRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
