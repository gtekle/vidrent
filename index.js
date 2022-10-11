const express = require('express');

const genresRouter = require('./routes/router.genres');

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/api/genres', genresRouter);


app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
