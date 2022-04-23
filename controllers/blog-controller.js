const Blog = require('../models/blog')
const slugify = require('slugify')
const { findOneAndRemove } = require('../models/blog')

const create = async (req, res, next) => {
	const { title, content, author } = req.body
	const slug = slugify(title)

	switch (true) {
		case !title:
			return res.status(400).json({ error: 'Please input title' })
			break
		case !content:
			return res.status(400).json({ error: 'Please input content' })
			break
	}

	const createdBlog = new Blog({
		title,
		content,
		author,
		slug,
	})

	try {
		await createdBlog.save()
	} catch (err) {
		const error = res.json({ error: 'Failed to create Blog pls try again' })
		return next(error)
	}

	res.status(201).json({ data: createdBlog })
}

const getAll = async (req, res, next) => {
	let blogs
	try {
		blogs = await Blog.find({})
	} catch (err) {
		const error = res.json({ error: 'Failed to getAll Blog pls try again' })
		return next(error)
	}

	res.status(200).json({ blogs: blogs })
}

const getSingleBlog = async (req, res, next) => {
	const { slug } = req.params
	let blog
	try {
		blog = await Blog.findOne({ slug })
	} catch (err) {
		const error = res.json({ error: 'Failed to getAll Blog pls try again' })
		return next(error)
	}

	res.json({ blog: blog })
}

const removeBlog = async (req, res, next) => {
	const { slug } = req.params
	let blog
	try {
		blog = await Blog.findOneAndRemove({ slug })
	} catch (err) {
		const error = res.json({ error: 'Failed to Delete Blog pls try again' })
		return next(error)
	}

	res.json('Deleted')
}

const updateBlog = async (req, res, next) => {
	const { slug } = req.params
	const { title, content, author } = req.body

	let blog
	try {
		blog = await Blog.findOneAndUpdate(
			{ slug },
			{ title, content, author },
			{ new: true }
		)
	} catch (err) {
		console.log(err)
	}

	res.json({ blog: blog })
}

exports.create = create
exports.getAll = getAll
exports.getSingleBlog = getSingleBlog
exports.removeBlog = removeBlog
exports.updateBlog = updateBlog
