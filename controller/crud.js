const jobSchema = require("../models/jobSearchSchema")

const getJobByID = async(req, res) => {
    try{
        const job = await jobSchema.findById(req.params.id)
        if (!job){
            return res.status(404).json({message:"Job Not Found"})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

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

module.exports = {getJobByID, getAllJobs, postJobs}