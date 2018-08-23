const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'f8f198b15fe544ed930d2da0fb14e6b5'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL,req.body.id)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id','=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json("UNABLE TO GET ENTRIEST"))
}

module.exports = {
	handleImage,
	handleApiCall
}