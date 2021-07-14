import axios from 'axios'

const baseUrl = '/api/blogs'

// 5.1
let token = null

const setToken = newToken => {

  token = `bearer ${newToken}`

  console.log(token)
}

const getAll = () => {

  const request = axios.get(baseUrl)

  return request.then(response => response.data)
}

// 5.3
const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}


export default { getAll, setToken, create, update, remove }
