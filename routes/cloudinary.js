const express = require('express')
const router = express.Router()

// controllers
const { createImage, removeImage} = require('../controllers/cloudinary')

// middlewares
const { auth } = require('../middlewares/auth')

// endpoint http://localhost:5000/api/images
router.post('/images', createImage)
router.post('/removeimages', removeImage)

module.exports =router