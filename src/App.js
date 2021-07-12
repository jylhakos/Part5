// $ npm install

import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'

import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {

    blogService.getAll().then(blogs => setBlogs( blogs ))

  }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {

      const user = JSON.parse(loggedUserJSON)

      setUser(user)

      blogService.setToken(user.token)
    }
  }, []) 

  const handleBlogChange = (event) => {

    console.log(event.target.value)

    setNewBlog(event.target.value)
  }

  const blogsToShow = showAll ? blogs : blogs.filter(blog => blog.important)

  
  // 5.2
  const handleLogout = async (event) => {

    console.log('handleLogout')

    try {

      setUser({})

      setUsername('')

      setPassword('')

      // window.localStorage.removeItem('loggedBlogUser')

      window.localStorage.clear()

      window.location.href = '/'

    } catch (exception) {

      console.log('Error', exception)

    }
  }

  // 5.1
  const handleLogin = async (event) => {

    event.preventDefault()

    try {

      const user = await loginService.login({username, password,})

      console.log('Login: ', username, password)

      blogService.setToken(user.token)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user)) 

      setUser(user)

      setUsername('')

      setPassword('')

    } catch (exception) {

      setErrorMessage('Error credentials')

      setTimeout(() => {

        setErrorMessage(null)

      }, 5000)
    }
  }

  const loginForm = () => (
 
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
            onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  return (
    <div>
       {
        user === null ? loginForm() :
        <div>
        <h2>blogs</h2>
          <div>
            <p>
              {user.name} logged in
              { 

                localStorage.getItem('loggedBlogUser') !== null ? <button style={{margin:'25px'}} onClick={ event => { if(localStorage.getItem('loggedBlogUser') !== null) handleLogout() } }> logout</button> : null

              }
            </p>
          </div>
          {  blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
        </div>
       }
    </div>
  )
}

export default App