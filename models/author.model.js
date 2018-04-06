const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AuthorSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    age: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Author', AuthorSchema);