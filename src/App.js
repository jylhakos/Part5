// $ npm install

import React, { useState, useEffect } from 'react'

// 5.2
//import { useHistory } from 'react-router-dom'

import Blog from './components/Blog'

import blogService from './services/blogs'

import loginService from './services/login'

const App = () => {

  //const history = useHistory()

  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // 5.3
  const createBlog = (event) => {

    event.preventDefault()

    console.log('Clicked', event.target)

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user._id
    }

    console.log('blogObject', blogObject.title, blogObject.author, blogObject.url)

    blogService.create(blogObject)
    .then(response => {
      console.log('response', response)
      setBlogs(blogs.concat(response.data))
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleTitleChange = (event) => {
    console.log('handleTitleChange', event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log('handleAuthorChange', event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log('handleUrlChange', event.target.value)
    setNewUrl(event.target.value)
  }

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

  // 5.2
  const handleLogout = async (event) => {

    console.log('handleLogout')

    event.preventDefault()

    try {

      setUser({})

      setUsername('')

      setPassword('')

      // window.localStorage.removeItem('loggedBlogUser')

      window.localStorage.clear()

      window.location.href = '/'

      //history.push('/api/login')

      //this.props.history.push('/api/login');

    } catch (exception) {

      console.log('Error', exception)

    }
  }

  // 5.1
  const handleLogin = async (event) => {

    console.log('handleLogin')

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

                localStorage.getItem('loggedBlogUser') !== null ? <button style={{margin:'25px'}} onClick={ event => { if(localStorage.getItem('loggedBlogUser') !== null) handleLogout(event) } }> logout</button> : null

              }
            </p>
          </div>
            <form onSubmit={createBlog}>
            <div>
              <div>
                <label>Title: </label><input value={newTitle} onChange={handleTitleChange}/>
              </div>
              <div>
                <label>Author: </label><input value={newAuthor} onChange={handleAuthorChange}/>
              </div>
              <div>
                <label>Url: </label><input value={newUrl} onChange={handleUrlChange}/>
              </div>
            </div>
              <div><button type="submit">Create</button></div>
            </form>
          {  blogs.map(blog => <Blog key={blog.id} blog={blog} /> )}
        </div>
       }
    </div>
  )
}

export default App