// const jobSchema = require("../models/jobSearchSchema")
// const JobApplication = require("../models/jobApplication");
// const jobApplication = require("../models/jobApplication");

// const getJobByID = async (req, res) => {
//     try {
//         const job = await jobSchema.findById(req.params.id);
//         if (!job) {
//             return res.status(404).json({ message: "Job Not Found" });
//         }
//         res.json(job);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// const getAllJobs = async (req, res) => {
//     try {
//       const jobs = await jobSchema.find();
//       res.json(jobs);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };

// const postJobs = async (req, res) => {
//     try{
//         const newJob = await jobSchema.create(req.body)
//         res.status(201).json(newJob)
//     }catch(error) {
//         console.log('Error Creating new User', error.message)
//         res.status(400).json({msg:error.message})

//     }
// }


// const applyForJob = async (req, res) => {
//   try {
//     const { jobId, expectedAmount, expectedDuration, expectedCurrency, fitDescription, bidAmount } = req.body;

//     const existingBids = await JobApplication.find({ jobId }).sort({ bidAmount: 1 });
//     const bidRank = existingBids.findIndex(bid => bid.bidAmount >= bidAmount) + 1;

//     const newApplication = new JobApplication({
//       jobId,
//       expectedAmount,
//       expectedDuration,
//       expectedCurrency,
//       fitDescription,
//       bidAmount,
//       bidRank,
//     });

//     await newApplication.save();
//     res.status(201).json(newApplication);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const getBidsForJob = async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const bids = await JobApplication.find({ jobId });
//     res.json(bids);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateBid = async (req, res) => {
//   try {
//     const { bidId } = req.params;
//     const { expectedAmount, expectedDuration, expectedCurrency, fitDescription, bidAmount } = req.body;

//     const bid = await JobApplication.findById(bidId);
//     if (!bid) {
//       return res.status(404).json({ message: "Bid Not Found" });
//     }

//     bid.expectedAmount = expectedAmount;
//     bid.expectedDuration = expectedDuration;
//     bid.expectedCurrency = expectedCurrency;
//     bid.fitDescription = fitDescription;
//     bid.bidAmount = bidAmount;

//     const existingBids = await JobApplication.find({ jobId: bid.jobId }).sort({ bidAmount: 1 });
//     bid.bidRank = existingBids.findIndex(existingBid => existingBid._id.toString() !== bidId && existingBid.bidAmount >= bidAmount) + 1;

//     await bid.save();
//     res.json(bid);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = {getJobByID, getAllJobs, updateBid,postJobs, applyForJob, getBidsForJob}







const jobSchema = require("../models/jobSearchSchema")
const JobApplication = require("../models/jobApplication");
const jobApplication = require("../models/jobApplication");
const User = require('../models/User')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secretKey = process.env.secretKey

const getJobByID = async (req, res) => {
    try {
        const job = await jobSchema.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job Not Found" });
        }
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getAllJobs = async (req, res) => {
    try {
      const jobs = await jobSchema.find();
      res.json(jobs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const postJobs = async (req, res) => {
    try{
        const newJob = await jobSchema.create(req.body)
        res.status(201).json(newJob)
    }catch(error) {
        console.log('Error Creating new User', error.message)
        res.status(400).json({msg:error.message})

    }
}


const applyForJob = async (req, res) => {
  try {
    const { jobId, expectedAmount, expectedDuration, expectedCurrency, fitDescription, bidAmount, userId } = req.body;

    const existingBids = await JobApplication.find({ jobId }).sort({ bidAmount: 1 });
    const bidRank = existingBids.findIndex(bid => bid.bidAmount >= bidAmount) + 1;

    const newApplication = new JobApplication({
      jobId,
      expectedAmount,
      expectedDuration,
      expectedCurrency,
      fitDescription,
      bidAmount,
      bidRank,
      userId,
    });

    await newApplication.save();
    res.status(201).json(newApplication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBidsForJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const bids = await JobApplication.find({ jobId });
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBid = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { expectedAmount, expectedDuration, expectedCurrency, fitDescription, bidAmount, userId } = req.body;

    const bid = await JobApplication.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: "Bid Not Found" });
    }

    bid.expectedAmount = expectedAmount;
    bid.expectedDuration = expectedDuration;
    bid.expectedCurrency = expectedCurrency;
    bid.fitDescription = fitDescription;
    bid.bidAmount = bidAmount;
    bid.userId = userId;

    const existingBids = await JobApplication.find({ jobId: bid.jobId }).sort({ bidAmount: 1 });
    bid.bidRank = existingBids.findIndex(existingBid => existingBid._id.toString() !== bidId && existingBid.bidAmount >= bidAmount) + 1;

    await bid.save();
    res.json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid User" });

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
    

const userSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, secretKey);
    res.status(201).json({ token, userId: newUser._id, username: newUser.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const searchJob = async (req, res) => {
  try {
    const { query, location, tags } = req.query;

    const searchCriteria = {
      $and: []
    };

    if (query) {
      searchCriteria.$and.push({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { company_name: { $regex: query, $options: 'i' } },
          { details: { $regex: query, $options: 'i' } }
        ]
      });
    }

    if (location) {
      searchCriteria.$and.push({
        location: { $regex: location, $options: 'i' }
      });
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      searchCriteria.$and.push({
        tags: { $in: tagArray }
      });
    }

    if (searchCriteria.$and.length === 0) {
      const jobs = await jobSchema.find();
      res.json(jobs);
    } else {
      const jobs = await jobSchema.find(searchCriteria);
      res.json(jobs);
    }
  } catch (error) {
    res.status(500).json({ message: "Error Fetching jobs", error });
  }
};


module.exports = {getJobByID, getAllJobs, updateBid,postJobs, searchJob,  applyForJob, getBidsForJob, userLogin, userSignup}