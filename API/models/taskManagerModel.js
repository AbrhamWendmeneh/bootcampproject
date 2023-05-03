const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    nameoftask: {
        type: String,
        required: [true, 'must provide name'],
        
    },
    nameoftaskdesc: {
        type: String,
        required: [true, 'must provide name'],
        
    },
  completedtask: {
      type: Boolean,
      default:false
  },
  userId:{
    type: String,

  }

})

module.exports = mongoose.model('Task', TaskSchema)