const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		content: {
			type: {},
			required: true,
		},
		author: {
			type: String,
			default: 'Admin',
		},
		slug: {
			type: String,
			lowercase: true,
			unique: true,
		},
	},
	{ timestamps: true }
)

module.exports = mongoose.model('Blog', blogSchema)
