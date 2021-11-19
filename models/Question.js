const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-page');
var timestamps = require('mongoose-timestamp');

const QuestionSchema = new mongoose.Schema({
	question : String,
	options : [
	{
		name : String,
		label : String,
		counter : Number
	}],
	correctAnswer : String,	
	givenAnswer : String
}, {timestamp : true}
)

QuestionSchema.plugin(mongoosePaginate);
QuestionSchema.plugin(timestamps);

module.exports = mongoose.model('Question', QuestionSchema);