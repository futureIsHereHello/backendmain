const mongoose = require('mongoose')
const jobSchema = new mongoose.Schema({
    date_posted:{
        type:String, 
        required:[true,'Date must e provided']
    }, 
    company_name:{
        type:String, 
        require:true
    }, 
    role:{
        type:String, 
        required:true
    },
    tags:{
        type:[String], 
        require:true
    },
    pay_rate:{
        type:String, 
        require:true
    },
    location:{type:String,required:false},
    details:{type:String, required:true}
})

module.exports = mongoose.model('jobs', jobSchema);
