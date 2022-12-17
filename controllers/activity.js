const activitys = require('../models/activity')

// Get
exports.getData =(req,res)=> {
    // console.log(req)
    const user = req.query.user
    activitys.find({username:user}).exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        console.log(activity)
        res.json(activity)
    })
}

exports.getChart =(req,res)=> {
    console.log(req.body.username)
    const user = req.body.username
    activitys.aggregate([{$match:{'username': user } }
    ,{$group:{_id: "$activityType",totalscore:{ $sum: 1}}}]).exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        console.log(activity)
        res.json(activity)
    })
}

/*
db.activitys.aggregate([{$match:{'username': 'sarapao.peetgungunMark@gmail.com' } },{$group:{_id: "$activityType",totalscore:{ $sum: 1}}}])
{ _id: 'walk', totalscore: 4 }
{ _id: 'hike', totalscore: 1 }
{ _id: 'swim', totalscore: 1 }
{ _id: 'run', totalscore: 1 } 
*/


// Create
exports.createActivity =(req,res)=> {
    const { username,activityName,activityType,startActivity,endActivity,
        detailActivity,status,duration } = req.body
        activitys.create({ username,activityName,activityType,startActivity,endActivity,
        detailActivity,status,duration },(err,activity) =>{
        
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        res.json(activity)
    })
}

exports.getOneCard = (req,res) => {
    const {id} = req.params
    // console.log(req)
    activitys.findOne({_id: id}).exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        res.json(activity)
    })
}

exports.editActivity = (req,res)=> {
    const {id} = req.params
    // console.log(req.body)
    const { activityName,activityType,startActivity,endActivity,
        detailActivity,duration } = req.body
    console.log(req.body)
    activitys.findOneAndUpdate({_id: id},{activityName,activityType,startActivity,endActivity,
        detailActivity,duration},{new:true})
    .exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        res.send(activity)
    })
}

exports.changeStatus = (req,res)=> {
    const {id} = req.params
    // console.log(id)
    const { status } = req.body
    // console.log(req.body)
    activitys.findOneAndUpdate({_id: new ObjectId(`${id}`)},{status},{new:true})
    .exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        res.send(activity)
    })
}

exports.totalStatus = (req,res)=> {
    const {id} = req.params
    // console.log(id)
    const { status } = req.body
    // console.log(req.body)
    db.activitys.aggregate([{$match:{'username': 'sarapao.peetgungunMark@gmail.com' } },{$group:{_id: "$status",totalscore:{ $sum: 1}}}])
    .exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        res.send(activity)
    })
}


exports.removeOneCard = (req,res) => {
    const {id} = req.params
    console.log(id)
    const filter = {_id: id}
    // const filter = {_id: id}
    activitys.findOneAndDelete(filter).exec((err,blog) => {
        if (err) {  console.log(err)  }
        res.json({
            message:"Delete success!"
        })
    })
}
