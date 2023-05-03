const express = require('express')
const taskRouter = express.Router()

const {getAllTasks,createTask,getTask,updateTask,deleteTask} = require('../controllers/tasksController')


taskRouter.get('/get_all_tasks',getAllTasks)
taskRouter.post('/create_task',createTask)
taskRouter.get('/get_task/:id',getTask)
taskRouter.delete('/delete_task/:id',deleteTask)
taskRouter.put('/update_task/:id', updateTask);




module.exports = taskRouter