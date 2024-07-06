const app = require('./app')
const connectDB = require('./db/connect')

const PORT = process.env.PORT || 5001

const start = async() =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>console.log(`Server is listening on ${PORT}`))
    }catch(error){
    console.log(error)

    }
}


start()
