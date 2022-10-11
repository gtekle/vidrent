const express = require('express');

const {genres, validateGenre} = require('../models/model.genres');

const genresRouter = new express.Router();

genresRouter.get('/', (req, res) => {
    res.send(genres);
});

genresRouter.post('/', (req, res) => {
    const genre = {
        name: req.body.name
    };

    const {error, value} = validateGenre(genre);
    if(error) return res.status(400).send(error.details[0].message);

    genre.id = genres.length + 1;
    genres.push(genre);
    
    res.send(genre);
});

genresRouter.get('/:id', (req, res) => {
    const genre = genres.find(gen =>  gen.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with given ID was not found!`);

    res.send(genre);
});

genresRouter.put('/:id', (req, res) => {
    let genre = genres.find(gen =>  gen.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with given ID was not found!`);

    const newGenre = {
        name: req.body.name
    };

    const {error, value} = validateGenre(newGenre);
    if(error) return res.status(400).send(error.details[0].message);

    genre.name = newGenre.name;

    genres.push(genre);
    res.send(genre);
});

genresRouter.delete('/:id', (req, res) => {
    const genre = genres.find(gen =>  gen.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre with given ID was not found!`);
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    
    res.send(genre);
});

module.exports = genresRouter;
