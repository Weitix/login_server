const Counter = require('./../models/Counter');

exports.create = function (req, res) {
	let newCounter = {
		quiz_id: req._id,
		count: 0,
		total: 0
	};


    const myCounter = new Counter(newCounter);
	myCounter.save(function(err, myCounter) {
		if (err) {
			res.json({success: false, result: [], messages: [err.message]});
		} else {
			res.json({success: true, result: newCounter, messages: []});
		}
	})
};


exports.update = function (req, res) {
	Counter.findOneAndUpdate({_id: req.body._id}, req.body,
		function(err, data) {
			if (err) {
				res.json({success: false, result: [], messages: [err.message]});
      		} else {
      			res.json({success: true, result: data, messages: []});
      		}
	});
};

exports.read = function (req, res) {

	Counter.find({},
		function (err, counters) {
			if (err) {
				res.json({success: false, result: [], messages: [err.message]});
			} else {
				res.json({success: true, result: counters, messages: []});
			}
		}
	).populate('quiz_id');
};

exports.readOne = function (req, res) {
	Counter.find({quiz_id: req.params.id},
		function (err, counter) {
			if (err) {
				res.json({success: false, result: [], messages: [err.message]});
			} else {
				res.json({success: true, result: counter, messages: []});
			}
		}
	).populate('quiz_id');
};