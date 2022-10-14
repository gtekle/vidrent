const Joi = require('joi');
const mongoose = require('mongoose');

// DataTypes: String, 
//            Number, 
//            Date, 
//            Buffer, 
//            Boolean, 
//            ObjectID, 
//            Array
const genreSchema = new mongoose.Schema({
    id: Number,
    name: { 
        type: String, 
        required: true,
        minlength: 5,
        maxlength: 50
     },
    isPublished: Boolean
});

const Genre = mongoose.model('Genre', genreSchema);

async function createGenre({name, isPublished}) { 
    const genre = new Genre({
        name,
        isPublished
    });

   return await genre.save();
}

async function getGenres() {
    return await Genre.find({}).select({id: 1, name: 1});
}

async function getGenre(id) {
    return await Genre.find({_id: id});
}

async function updateGenre(id, genre) {
    return await Genre.findByIdAndUpdate(id, {name: genre.name}, {new: true});
}

async function deleteGenre(id) {
    return await Genre.findByIdAndDelete(id);
}

const schema = Joi.object({
    name: Joi.string().min(5).required()
});


const validateGenre = (genre) => schema.validate(genre);

module.exports = {
    getGenres,
    getGenre,
    createGenre,
    updateGenre,
    deleteGenre,
    validateGenre
};