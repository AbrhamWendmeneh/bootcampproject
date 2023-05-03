const mongoose = require('mongoose')
// const color=require('colors')
const connectDb = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URL)
          console.log('mongoDb is connected')
    } catch (error) {
        console.log("error")
    }
}

module.exports = connectDb