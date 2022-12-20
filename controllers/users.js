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
    try {
        // Code
        var {id, password} = req.body.values
        // 1 gen salt
        const salt = await bcrypt.genSalt(10);
        // 2 encrypt
        var enPassword = await bcrypt.hash(password, salt);
    
        const user = await User.findOneAndUpdate(
          { _id: id },
          { password: enPassword }
        );
        res.send(user);
      } catch (err) {
        console.log(err);
        res.status(500).send("Server Error!");
      }
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
