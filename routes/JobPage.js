const {getJobByID, getAllJobs, postJobs, searchJob, updateBid,applyForJob, getBidsForJob, userLogin, userSignup} = require('../controller/crud')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

//User Routes
router.post('/signup', userSignup)
router.post('/login', userLogin)

//Job Routes
router.get('/jobs/search', searchJob); // Ensure this comes before the dynamic :id route
router.get("/jobs", getAllJobs)
router.get('/jobs/:id', getJobByID);
router.post('/jobs', auth, postJobs);
router.post('/jobs/:id/apply', auth,  applyForJob);
router.get('/jobs/:id/bids', getBidsForJob);
router.put('/bids/:bidId', auth,  updateBid);

module.exports = router
