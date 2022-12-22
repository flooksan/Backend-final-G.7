const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
require('dotenv').config();
const {readdirSync} = require('fs')
const connectDB = require('./config/db')


const app = express()


connectDB()


//middelware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())

// Route
app.get('./',(req,res)=> {
    res.send("Backend group 7 ready!!")
})
readdirSync('./routes')
.map((r)=> app.use('/api', require('./routes/'+r)))


const port = process.env.PORT
app.listen(port,()=>{
    console.log('listening on port'+ port)
})