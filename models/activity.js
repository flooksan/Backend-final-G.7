const mongoose = require('mongoose')
// ตรงนี้นะ
const Activity = new mongoose.Schema({
    username:{
        type: String
    },
    activityName:{
        type: String
    },
    activityType:{
        type: String,
    },
    startActivity:{
        type: String,
    },
    endActivity:{
        type: String,
    },
    detailActivity:{
        type: String,
    },
    status: {
        type:Number,
        default:0
    }, // 0=Pending,1 =  Completed , 9 = Incomplete
    duration: {
        type:String,
    }
},
{timestamps: true}
)
module.exports = mongoose.model('activitys', Activity)