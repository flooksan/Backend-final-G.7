const express = require('express')
const router = express.Router()
// const activityModel = require('../models/activityCard')
const {getData,getChart,createActivity,getOneCard,removeOneCard,editActivity,changeStatus,getTotalStatus} = require('../controllers/activity')


router.get('/card-activity',getData)
router.get('/chart-activity',getChart)
router.get('/total-status',getTotalStatus)
router.post('/add-activity',createActivity)
router.get('/card-activity/:id',getOneCard)
router.delete('/card-activity/:id',removeOneCard)
router.put('/edit-activity/:id',editActivity)
router.put('/change-status/:id',changeStatus)

    



module.exports = router;