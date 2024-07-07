const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{

        type:String, 
        trim:true, 
        required:[true, 'No user name has been provided']
    },
    email:{
        type:String, 
        trim:true, 
        required:[true, 'No email ID has been provided']

    },
    password:{
            type:String, 
            trim:true, 
            reqiured:[true, 'No password has been provided']
    },
})

module.exports = mongoose.model("user", userSchema);
