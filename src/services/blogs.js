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

export default { getAll, setToken }
