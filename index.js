const express = require('express');

const genresRouter = require('./src/routes/router.genres');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api/genres', genresRouter);


app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
