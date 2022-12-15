const e = require('cors')
const express = require('express')
const router = express.Router()

//controller
const {
    register,
    login, 
    listUser, 
    editUser, 
    deleteUser,
    currentUser
} = require('../controllers/auth')

// middlewares
const { auth }= require('../middlewares/auth')

//@Endpoint http://localhost:3000/api/register
//@Method   POST
//@Access   Publish
router.post('/register', register)

//@Endpoint http://localhost:3000/api/login
//@Method   POST
//@Access   Publish
router.post('/login', login)

//@Endpoint http://localhost:3000/api/current-user
//@Method   POST
//@Access   Private
router.post('/current-user', auth, currentUser)


//Endpoint  http://localhost:3000/api/auth
//Method    GET
//Access    Publish
router.get('/auth', listUser)





router.put('/auth', editUser)


router.delete('/auth', deleteUser)

module.exports = router