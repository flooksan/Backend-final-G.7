const e = require('cors')
const express = require('express')
const router = express.Router()

//controller
const { 
    listUsers,
    readUsers,
    updateUsers,
    removeUsers 
} = require('../controllers/users')


// middlewares
const { auth }= require('../middlewares/auth')

//@Endpoint http://localhost:5000/api/users
//@Method   GET
//@Access   Private
router.get('/users', listUsers)

//@Endpoint http://localhost:5000/api/users/:id
//@Method   GET
//@Access   Private
router.get('/users/:id', readUsers)

//@Endpoint http://localhost:5000/api/users/:id
//@Method   PUT
//@Access   Private
router.put('/users/:id', updateUsers)

//@Endpoint http://localhost:5000/api/users/:id
//@Method   DELETE
//@Access   Private
router.delete('/users/:id', removeUsers)

module.exports = router