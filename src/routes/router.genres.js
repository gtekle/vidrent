const express = require('express');

const {
    getGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre,
    validateGenre,
   } = require('../models/model.genres');

const genresRouter = new express.Router();

genresRouter.get('/', async (req, res) => {
    res.send(await getGenres());
});

genresRouter.post('/', async (req, res) => {
    const genre = {
        name: req.body.name
    };

    const {error, value} = validateGenre(genre);
    if(error) return res.status(400).send(error.details[0].message);

    const persistedGenre = await createGenre(genre);
  
    res.send(persistedGenre);
});

genresRouter.get('/:id', async (req, res) => {
    const genre = await getGenre(req.params.id);
    if(!genre) return res.status(404).send(`Genre with given ID was not found!`);

    res.send(genre);
});

genresRouter.put('/:id', async (req, res) => {
    const newGenre = { name: req.body.name };

    const {error, value} = validateGenre(newGenre);
    if(error) return res.status(400).send(error.details[0].message);

    const updatedGenre = await updateGenre(req.params.id, newGenre)
    if(!updatedGenre) return res.status(404).send(`Genre with given ID was not found!`);

    res.send(updatedGenre);
});

genresRouter.delete('/:id', (req, res) => {
    const deletedGenre = deleteGenre(req.params.id);

    if(!deletedGenre) return res.status(404).send(`Genre with given ID was not found!`);
    
    res.send(deletedGenre);
});

module.exports = genresRouter;
