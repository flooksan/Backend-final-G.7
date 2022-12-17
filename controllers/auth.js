const bcrypt = require('bcryptjs');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const { response } = require('express');
// const { currentUser } = require('../../');
exports.register = async(req, res)=> {
    try{
        // Check user
        const { username, password, firstname, lastname, displayname, height, weight, address, images } =req.body
        let user = await User.findOne({ username })
        if(user){
            return res.status(400).send('User Already exists')
        }
        const salt = await bcrypt.genSalt(10)
        user = new User({
            username,
            password,
            firstname,
            lastname,
            displayname,
            height,
            weight,
            address,
            images
        })
        // Encrypt
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.send('Register success');        
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.login = async (req, res) => {
    try{
        const { username, password } = req.body
        let user = await User.findOneAndUpdate({username},{ new: true })
        if(user && user.enabled){
            //check password
            const isMatch = await bcrypt.compare(password, user.password)

           if(!isMatch){
            return res.status(400).send('password mismatch')
           }
           //payload
           const payload = {
            user:{
                username: user.username,
                role: user.role,
            },
           };
            // Generate Token
           jwt.sign(payload,
            'jwtSecret', 
            {expiresIn:3600 },(err,token)=>{
            if(err) throw err;
            res.json({token,payload});
           })

        }else{
            return res.status(400).send('user not found')
        }
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.currentUser = async(req, res) => {
    try{
        console.log(req.user)
        const user = await User.findOne({username: req.user.username})
        .select('-password').exec()
        res.send(user)
    } catch(err) {
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.listUser = async(req, res)=> {
    try{
        res.send('list get user')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.editUser = async(req, res)=> {
    try{
        res.send('edit user')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}

exports.deleteUser = async(req, res)=> {
    try{
        res.send('remove user')
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error!')
    }
}