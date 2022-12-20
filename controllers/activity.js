// const activity = require('../models/activity');
const activitys = require('../models/activity')
const User2 = require('../models/user2')

exports.getData = async (req, res, next) => {
    try {
      const user = req.query.user;
      const activity = await activitys.find({ username: user }).sort( { createdAt: -1 } ).exec();
      const getChart = await activitys.aggregate([{$match:{'username': user } },{$group:{_id: "$status",totalscore:{ $sum: 1}}}]);
    //   res.send({activity,getChart});
    res.send(activity)
    } catch (err) {
      res.status(400).json({ error: `Error code: ${err}` });
    }
    next();
};

exports.getChart = (req, res, next) => {
    const user = req.query.user
    activitys.aggregate([{$match:{'username': user ,'status':1} }
    ,{$group:{_id: "$activityType",totalscore:{ $sum: 1}}}]).exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        // console.log('acti',activity)
        res.json(activity)
    })
};

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

// Create new
exports.createActivity2 =async (req,res)=> {
    const id = "63a1713013b5fcfc9bc91abb"
    const { username,activityName,activityType,startActivity,endActivity,
        detailActivity,status,duration } = req.body
    const created = new activitys({
        username,activityName,activityType,startActivity,endActivity,
        detailActivity,status,duration,created:id
    })
    const user2find = await User2.findById(id)
    
    try {
        await created.save()
        // เอา line 60 มายัด created ใส่ใน activityList
        user2find.activityList.push(created)
        await user2find.save()
    } catch (err) {
        console.log(err)
    }

    res.status(201).json({card:created});
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
        detailActivity,duration,status } = req.body
    activitys.findOneAndUpdate({_id: id},{activityName,activityType,startActivity,endActivity,
        detailActivity,duration,status},{new:true})
    .exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        res.send(activity)
    })
}


exports.changeStatus = (req,res)=> {
    const {id} = req.params
    console.log(id)
    const { status } = req.body
    activitys.findOneAndUpdate({_id: id},{status},{new:true})
    .exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        res.send(activity)
    })
}

exports.getTotalStatus = (req,res)=> {

    const user = req.query.user // wait to change

    activitys.aggregate([{$match:{'username': user } },{$group:{_id: "$status",totalscore:{ $sum: 1}}}])
    .exec((err,activity) => {
        if(err) { res.status(400).json({error:`Error code : ${err}`}) }
        console.log(activity)
        res.send(activity)
    })
}

// 0=Pending,1 =  Completed , 9 = Incomplete


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
