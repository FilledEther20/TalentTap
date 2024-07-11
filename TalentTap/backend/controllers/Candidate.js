const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authKeys = require('../lib/authKeys');
const Candidate = require('../models/Candidate');
const router = express.Router();

router.get('/signup', (req, res) => {
	res.send('HI');
});
// Signup route
router.post('/signup', (req, res) => {
	const { name, email, password, education, skills, phone } = req.body;

	// Create a new Candidate instance
	let candidate = new Candidate({
		name: name,
		email: email,
		password: password,
		education: {
			degree: education.degree,
			institution: education.institution,
			yearOfCompletion: education.yearOfCompletion,
		},
		skills: skills,
		phone: phone,
	});

	candidate
		.save()
		.then(() => {
			// Generate JWT token
			const token = jwt.sign({ _id: candidate._id }, authKeys.jwtSecretKey);
			res.json({
				token: token,
				type: 'candidate',
			});
		})
		.catch((err) => {
			res.status(400).json(err);
		});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', { session: false }, (err, candidate, info) => {
		if (err) {
			return next(err);
		}
		if (!candidate) {
			return res.status(401).json(info);
		}
		const token = jwt.sign({ _id: candidate._id }, authKeys.jwtSecretKey);
		res.json({
			token: token,
			type: 'candidate',
		});
	})(req, res, next);
});

module.exports = router;