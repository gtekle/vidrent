const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

const genresRouter = require('./src/routes/router.genres');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

console.log('Application Name: ', config.get('name'));
console.log('Mail Server: ', config.get('mail.host'));
console.log('Mail Password: ', config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan is enabled...');
}

app.use('/api/genres', genresRouter);


app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
