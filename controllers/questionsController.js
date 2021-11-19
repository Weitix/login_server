const Question = require('./../models/Question');

exports.create = function (req, res) {

	var newQuestion = {
		question : req.body.question,
		options : req.body.options,
		correctAnswer : req.body.correctAnswer,
		givenAnswer : req.body.givenAnswer
	}

	const myQuestion = new Question(newQuestion);

	myQuestion.save((err, question) => {
		if (err) {
            res.json({success: false, result: [], messages: [err.message]});
		} else {
            res.json({success: true, result: question, messages: []});
        }
	})
}

exports.read = function (req, res) {

	const responseJSON = {success: false, result: [], messages: [], pagination: []}
    
    let queryOptions = {};
    let query = {};

    queryOptions = {
            page: req.query.pageIndex ? req.query.pageIndex * 1 : 1,
            limit: req.query.limit ? req.query.limit * 1 : 10,
            sort: '-updatedAt'
        }    

	Question.paginate(query, queryOptions)
        .then(function (queryResult) {

            responseJSON.success = true;
                responseJSON.docs = queryResult.docs;
                responseJSON.pagination = {
                    total: queryResult.total,
                    limit: queryResult.limit,
                    page: queryResult.page,
                    pages: queryResult.pages
                };
                res.status(200).json(responseJSON)
    })  
}

exports.update = function (req, res) {
	var updatedQuestion = {
		question : req.body.question,
		options : req.body.options,
		correctAnswer : req.body.correctAnswer,
		givenAnswer : req.body.givenAnswer
	}


	Question.update({"_id": req.body._id}, {$set: updatedQuestion},
		function (err, question) {
			if (err) {
				res.json({success: false, result: [],messages: [err.messages]});
			} else {
                res.json({success: true, result: question, messages: []});
			}
		});
}

exports.delete = function (req, res) {
    Question.remove({"_id": req.params.id},
        function (err, item) {
            if (err) {
                res.json({success: false, result: [], messages: [err.message]});
            } else {
                res.json({success: true, result: item, messages: []});
            }
        })
};