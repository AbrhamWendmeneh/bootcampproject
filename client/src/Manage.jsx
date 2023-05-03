import NavBar from './components/NavBar'
import './style1.css'
import './manage.css'
import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios'



function ManageTask() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskNameList, setTaskNameList] = useState([]);
  

  const getAllTasks=async()=>{
       let Basic_URL= 'http://localhost:8000';
      try{
        const response=  await axios.get(`${Basic_URL}/get_all_tasks`)
         setTaskNameList(response.data)
      }
      catch(error){
        return error
      }
  }


  useEffect(()=>{
    getAllTasks()
  },[taskNameList]
  )

 
  async function addTask(event) {
    event.preventDefault();
    if (taskName === '') {
      alert('Please enter a task name.');
      return;
    }

    const newTask = {
      nameoftask: taskName,
      nameoftaskdesc: taskDesc,
      completedtask: false,
      userId: localStorage.getItem('token')

    };

    let Basic_Url='http://localhost:8000';

    try {
      
    const response= await axios.post(`${Basic_Url}/create_task`,newTask)
     setTasks([...tasks, response.data]);
     setTaskName('');
     setTaskDesc('');
     
     
    } 
    catch (error) { 

      console.log(error);
    }
  }


  function handleTaskNameChange(event) {
    setTaskName(event.target.value);
  }

  function handleTaskDescChange(event) {
    setTaskDesc(event.target.value);
  }

  const handleTaskCompletionChange = async (index) => {
    const Basic_Url = 'http://localhost:8000';
    const taskToUpdate = taskNameList[index];
    const updatedTask = {
      ...taskToUpdate,
      completedtask: !taskToUpdate.completedtask,
    };
    try {
      const response = await axios.put(`${Basic_Url}/update_task/${taskToUpdate._id}`, updatedTask);
      const newTasks = [...taskNameList];
      newTasks[index] = response.data;
      setTaskNameList(newTasks);
    } catch (error) {
      console.log(error);
    }
  };
  
//for the task updation button 
  const handleTaskUpdate = async (index, newName, newDesc, newCompleted) => {
    const Basic_Url = 'http://localhost:8000';
    const taskToUpdate = taskNameList[index];
    const updatedTask = {
      ...taskToUpdate,
      nameoftask: newName,
      nameoftaskdesc: newDesc,
      completed: newCompleted,
    };
    console.log('Updated task:', updatedTask);
    try {
      const response = await axios.put(`${Basic_Url}/update_task/${taskToUpdate._id}`, updatedTask);
      console.log('API response:', response);
      const newTasks = [...taskNameList];
      newTasks[index] = response.data;
      setTaskNameList(newTasks);
    } catch (error) {
      console.log(error);
    }
  };

  
//for the task deletion button 

async function handleTaskDeletion(id, index) {
  let Basic_Url='http://localhost:8000';
  try {
    await axios.delete(`${Basic_Url}/delete_task/${id}`);
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  } catch (error) {
    console.log(error);
  }


}


console.log(taskNameList?.map(task=>task.completedtask))

  return (
   <div className='manage-main-container'>
    <NavBar/>
    
   <div className='inner-container'>
     <h1>Task List</h1>
     <form id="add-task-form" className="main__form" onSubmit={addTask}>
     
      <label htmlFor="task-name" className="main__form__lable">Task Name:</label>
      <input type="text" id="task-name" name="task-name" value={taskName} onChange={handleTaskNameChange}/>
      <label htmlFor="task-desc" className="main__form__lable" >Task Description:</label>
      <input type="text" id="task-desc" name="task-desc" value={taskDesc} onChange={handleTaskDescChange}/>
      <input type="submit" id="task-submit" value="Add Task"/>
    </form>
    <table id="task-list" className="main__table">
      <thead className="main__table__head  head__val">
        <tr className="main__table__head__row">
          <th className="main__table__head__row__heads">Task Name</th>
          <th className="main__table__head__row__heads">Description</th>
          <th className="main__table__head__row__heads">Status</th>
          <th className="main__table__head__row__heads">Actions</th>
        </tr>
      </thead>
        <tbody>
          {taskNameList?.map((task, index) => (
            <tr key={index} >
              <td>{task.nameoftask}</td>
              <td>{task.nameoftaskdesc}</td>
 
              <td>
                <input
                  type="checkbox"
                  checked={task.completedtask}
                  onChange={() => handleTaskCompletionChange(index)}
                />
                {task.completedtask ? 'Completed' : 'Incomplete'}
              </td>
              <td>
                <button
                  style={{ background: 'dodgerblue', color: 'white', border: 'none', cursor: 'pointer', padding: '5px', height: '2rem', borderRadius: '5px' }}
                  onClick={() => handleTaskUpdate(index, prompt('Enter new task name:', task.nameoftask), prompt('Enter new task description:', task.nameoftaskdesc))}
                >
                  Update
                </button>
                {/* Add delete button */}
                <button
                  style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer', padding: '5px', height: '2rem', borderRadius: '5px', marginLeft: '10px' }}
                  onClick={() => handleTaskDeletion(task._id,index)}>
                
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
    </table>
    </div>
    </div>
  )
}
export default ManageTask;


