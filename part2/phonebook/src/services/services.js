import axios from "axios";
const baseURL = "http://localhost:3001/persons"

const getAll = () => {
  const req = axios.get(baseURL)
  return req.then(response => response.data)
}

const create = (personObject) => {
  const req = axios.post(baseURL, personObject)
  return req.then(response => response.data)
}

export default {getAll, create}
