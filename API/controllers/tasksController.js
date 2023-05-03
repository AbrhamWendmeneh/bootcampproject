const { json } = require('express')
const taskManagerModel = require('../models/taskManagerModel')



const getAllTasks = async (req, res) => {
   
    try {
        const tasks = await taskManagerModel.find()
        if (!tasks){
        res.status(401).json({
            message:'there is no task'
        })}
        else{
            res.status(200).json(tasks)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

const createTask = async (req, res) => {
       const {nameoftask,nameoftaskdesc,completedtask}= req.body


    try {
        const tasks = await taskManagerModel.findOne({nameoftask})
        if (tasks){
        res.status(400).json({
            message:'Task already exist'
        })
        
        }
        else{
            const newTask=await taskManagerModel.create({nameoftask,nameoftaskdesc,completedtask})
            res.status(200).json(newTask)
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

const getTask = async (req, res) => {
    try {
        const { id: userId } = req.params
        const task = await task.findOne({ _id: userId })
        if (!task) {
            return res.status(404).json({ msg: `No task with id ${taskID}` })
        }
        res.status(200).json({ task })
    }
    catch (error) {
        res.status(500).json({ error })
    }
}

const  deleteTask =  async (req, res) => {
     const {id} = req.params
    try {
       
        const task = await taskManagerModel.findByIdAndDelete(id)
        if (!task) {
            return res.status(404).json({ msg: `No task with id ${id}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ error })
    }
}

// const updateTask = async (req, res) => {
//     try {
//         const {id:taskID} = req.params

//         const task = await Task.findOneAndUpdate({_id:taskID}, req.body, {
//             new: true,
//             runValidators: true
//         })

//         if (!task) {
//             return res.status(404).json({ msg: `No task with id ${taskID}` })
//         }

//         res.status(200).json({task})

//     } catch (error) {
//         res.status(500).json({  error })
//     }
// }

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await taskManagerModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })
        if (!task) {
            return res.status(404).json({ message: `No task with id ${id}` })
        }
        res.status(200).json(task)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

const markIncomplete=async(req,res)=>{
    try{
        const {id}=req.params;
        const task=await taskManagerModel.findById(id);
        if (!task){
            return res.status(404).json({messages:`No task with this ${id}`});

        }
        if (task.completedtask===false){
          return  res.status(400).json({message:`Task is already incompleted`})
        }
           task.completedtask==false;
           const  updateTask=await task.save();
           res.status(200).json(updateTask)
    }catch(error){
        res.status(error)
    }
}

const markComplete=async(req,res)=>{
    try {
        const {id}=req.params;
        const task=await taskManagerModel.findByIdAndUpdate(id,{completedtask:true},
            {
                new:true,
                runValidators:true
            })

            if (!task){
                return res.status(404).json({
                    message:`No task with id ${id}`
                })
            }
            res.status(200).json(task)
        
    } catch (error) {
        res.status(500).json(error)
        
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}