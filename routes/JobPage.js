const {getJobByID, getAllJobs, postJobs} = require('../controller/crud')
const express = require('express')
const router = express.Router()


router.get("/jobs", getAllJobs)
router.post('/jobs', postJobs)

module.exports = router