const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: String
    },
    password:{
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    displayName: {
        type: String
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    role:{
        type: String,
        default: 'user'
    },
    enabled:{
        type: Boolean,
        default: true
    },
    images:{
        type: Array
    },
},
{timestamps: true}
)
module.exports = User = mongoose.model('users', UserSchema)