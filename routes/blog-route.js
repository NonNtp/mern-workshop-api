const express = require('express')

const router = express.Router()

const { requireLogin } = require('../controllers/auth-controller')

const {
	create,
	getAll,
	getSingleBlog,
	removeBlog,
	updateBlog,
} = require('../controllers/blog-controller')

router.get('/blogs', getAll)
router.get('/blog/:slug', getSingleBlog)

router.post('/create', requireLogin, create)

router.delete('/blog/:slug', requireLogin, removeBlog)

router.put('/blog/:slug', requireLogin, updateBlog)

module.exports = router
