const Joi = require('joi');

const genres = [
    {id: 0, name: "Sci-fi"},
    {id: 1, name: "Romance"},
    {id: 2, name: "Horor"}
];

const schema = Joi.object({
    name: Joi.string().min(3).required()
});


const validateGenre = (genre) => schema.validate(genre);

module.exports = {genres, validateGenre};