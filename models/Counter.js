const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Counter', new mongoose.Schema({
	quiz_id: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz',
        default: null
	},
	count: Number,
	total: Number
}, {timestamp: true}
))