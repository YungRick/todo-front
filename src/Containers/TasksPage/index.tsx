// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, FC } from 'react'
import axios, { AxiosResponse } from 'axios'
import uuid from 'uuid/v1'
import { object } from 'prop-types';
import { fetchTasks, addTask, removeTaskById } from '../../Api/api-calls'  
import { API_ROOT } from '../../Api/api'

interface Task {
  _id: string,
  name: string
}

const TasksPage:FC = () => {

  const [tasks, setTasks] = useState([])
  const [editableTask, setEditableTask] = useState(null)
  const [error, setError] = useState(null)

  const fetchAndSetTasks = () => {
    fetchTasks()
    .then((res: AxiosResponse) => {
      // handle success
      setTasks(res.data.tasks)
    })
    .catch(error => {
      // handle error
      setError(error);
    })
  }


  useEffect(() => {
    fetchAndSetTasks()
  }, []);

 
  const handleEditableTaskChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let id:String = uuid();

    setEditableTask({
      id,
      name: e.target.value,
      completed: false,
    })
  }

  const submitTask = () => {
    console.log(editableTask)
    setEditableTask(null); 
    addTask(editableTask)
    .then((response) => {
      fetchAndSetTasks()
    })
    .catch((error) => {
      setError(error);
    });
  }

  const removeTask = (id: string) => {
    removeTaskById(id)
    .then((response) => {
      fetchAndSetTasks()
    })
    .catch((error) => {
      setError(error)
    });
  } 

  return (
    <div className='frontpage-'>
      <h1 className='header'>Tasks</h1>
      {!error && (
        <div className='todo-list'>
        {tasks.map((task) => (
          <div>
            <li className='todo-item' key={(task as Task)._id}>{(task as Task).name}</li>
            <button onClick={() => removeTask(task._id)}>remove</button> 
          </div>
        ))}
        <input onChange={handleEditableTaskChange} value={editableTask !== null ? editableTask.name : ''}></input>
        <button className='add-task-button' onClick={submitTask}>Add task</button>
        </div>
      )}
      {error && (
        <h3>Unknown error. Please try again</h3>
      )}
    </div>
  )
}

export default TasksPage