const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('dotenv').config()

//configuring the entry points of the url
const entryPoint = "/"
const jobApplicationPath = "/jobs"
//setting up the configuration for middleware
const config = {
    origin: ['http://localhost:3000'],
    methods:['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['content-type'],
    credentials:true,
}

//setting up the middlware
app.set('trust-proxy',1)
app.use(cors(config))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//setting up the routes
const jobsRoute = require('./routes/JobPage')


app.use(entryPoint, jobsRoute)
app.use(jobApplicationPath, jobsRoute)

module.exports = app

