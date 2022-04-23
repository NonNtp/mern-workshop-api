const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRoute = require('./routes/blog-route')
const authRoute = require('./routes/auth-route')
const HttpError = require('./models/http-error')

require('dotenv').config()

const app = express()

//connect cloud database
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: false,
	})
	.then(() => {
		console.log('Connect to database success')
	})
	.catch((err) => {
		console.log(err)
	})

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//route
app.use('/api', blogRoute)
app.use('/api', authRoute)

app.use((req, res, next) => {
	const error = new HttpError('Could not find this route.', 404)
	throw error
})

const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log(`start server in port ${port}`)
})
