const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt')

const login = (req, res, next) => {
	const { username, password } = req.body

	if (password === process.env.PASSWORD) {
		const token = jwt.sign({ username }, process.env.JWT_SECRET, {
			expiresIn: '1d',
		})
		return res.json({ token, username })
	} else {
		return res.status(400).json({ error: 'Password incorrect!' })
	}
}

const requireLogin = expressJWT({
	secret: process.env.JWT_SECRET || 'admin-super-do',
	algorithms: ['HS256'],
	userProperty: 'auth',
})

exports.login = login
exports.requireLogin = requireLogin
