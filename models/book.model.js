const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BookSchema = Schema({
	author: { 
		type: Schema.Types.ObjectId, 
		ref: 'Author',
		required: true
	},
	title: {
		type: String,
		unique: true
	}
},{
	timestamps: true
});

module.exports = mongoose.model('Book', BookSchema);