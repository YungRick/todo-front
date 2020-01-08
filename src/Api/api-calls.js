import axios from "axios";
import { API_ROOT } from '../Api/api'

export const fetchTasks = () => 
  axios.get(`${API_ROOT}/api/tasks`)

export const addTask = (task) =>
  axios.post(`${API_ROOT}/api/add-task`, task)

export const removeTaskById = (taskId) =>
  axios.post(`${API_ROOT}/api/remove-task?id=${taskId}`)
  
