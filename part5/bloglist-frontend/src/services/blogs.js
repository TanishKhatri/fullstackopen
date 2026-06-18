import axios from 'axios'
const baseUrl = '/api'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/blogs`)
  return response.data
}

const addBlog = async (blogObject) => {
  const response = await axios.post(`${baseUrl}/blogs`, blogObject, { headers: { 'Authorization': token } })
  return response.data
}

const updateBlog = async (id, blogObject) => {
  const response = await axios.put(`${baseUrl}/blogs/${id}`, blogObject)
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/blogs/${id}`, { headers: { 'Authorization': token } })
  return response
}

export default { login, getAll, setToken, addBlog, updateBlog, deleteBlog }