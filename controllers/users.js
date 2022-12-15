const bcrypt = require('bcryptjs');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const { response } = require('express');
// const { currentUser } = require('../../');
exports.listUsers = async(req, res)=> {
    try{
        const user = await User.find({}).select('-password').exec();
        res.send(user)        
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.readUsers = async(req, res)=> {
    try{
        const id = req.params.id
        const user = await User.findOne({_id:id}).select('-password').exec()
        res.send(user)        
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.updateUsers = async(req, res)=> {
 }

exports.removeUsers = async(req, res)=> {
    try{
        const id = req.params.id;
        const user = await User.findOneAndDelete({_id: id })
        res.send(user)        
    }   catch(err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}
