// $ npm install

// npm install prop-types

import React, { useState, useEffect } from 'react'

// 5.11
import PropTypes from 'prop-types'

import './index.css'

import Blog from './components/Blog'

import BlogForm from './components/BlogForm'

import Togglable from './components/Togglable'

import blogService from './services/blogs'

import loginService from './services/login'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newInfo, setNewInfo] = useState(null)
  const [newError, setNewError] = useState(null)

  // 5.4
  const ErrorMsg = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">{newError}</div>
      )
  }

  const InfoMsg = ({message}) => {
    if ( message === null) {
      return null
    }

    return (
      <div className="successful">{newInfo}</div>
      )
  }

  // 5.5
  //const addBlog = (event) => {
  // 5.6
  const addBlog = async (blogObject) => {
    const response = await blogService.create(blogObject)
    //  .then(response => {

    console.log('response', response)

    //setBlogs(blogs.concat(response.data))

    const blogs = await blogService.getAll()

    setBlogs(blogs)

    console.log('blogs', blogs)

    //console.log('blogObject', response.data.title, response.data.author, response.data.url)

    //blogService.getAll().then(blogs => setBlogs(blogs))

    setNewInfo(`The blog ${response.title} is created by ${response.author}`)

    setTimeout(() => {
     setNewInfo(null)
    }, 5000)

    //})
  }

  // 5.3
  /* const createBlog = async (event) => {

    event.preventDefault()

    console.log('Clicked', event.target)

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user._id
    }

    console.log('blogObject', blogObject.title, blogObject.author, blogObject.url)

    const response = await blogService.create(blogObject)

    blogService.getAll().then(blogs => setBlogs( blogs ))

    //blogService.create(blogObject)
    //.then(response => {
    //  console.log('response', response)
    //  data = response
      //setBlogs(blogs.concat(response.data))
    //})
    
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    setNewInfo(`The blog ${blogObject.title} is created by ${blogObject.author}`)

    setTimeout(() => {
      setNewInfo(null)
    }, 5000)
  }*/

  //const handleTitleChange = (event) => {
  //  console.log('handleTitleChange', event.target.value)
  //  setNewTitle(event.target.value)
  //}

  //const handleAuthorChange = (event) => {
  //  console.log('handleAuthorChange', event.target.value)
  //  setNewAuthor(event.target.value)
  //}

  //const handleUrlChange = (event) => {
  //  console.log('handleUrlChange', event.target.value)
  //  setNewUrl(event.target.value)
  //}

  useEffect(() => {

    blogService.getAll().then(blogs => setBlogs( blogs ))

  }, [])

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

    if (loggedUserJSON) {

      const user = JSON.parse(loggedUserJSON)

      console.log('loggedUser', user)

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

      console.log('user', user)

      setUsername('')

      setPassword('')

    } catch (exception) {

      console.log(exception)

      //setErrorMessage('Error credentials')

      setNewError('A wrong username or password')

      setUsername('')

      setPassword('')

      setTimeout(() => {

        //setErrorMessage(null)

        setNewError(null)

      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
    <h2>Login</h2>
    { newError && (ErrorMsg `${newError}`) }
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
    </div>
  )

  const blogForm = () => (

    // 5.11
    <Togglable buttonLabel='Create New Blogs'>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
       {
        user === null ? loginForm() :
        <div>
        <h2>blogs</h2>
          { newInfo && (InfoMsg `${newInfo}`) }
          <div>
            <p>
              {user.name} logged in
              { 

                localStorage.getItem('loggedBlogUser') !== null ? <button style={{margin:'25px'}} onClick={ event => { if(localStorage.getItem('loggedBlogUser') !== null) handleLogout(event) } }> logout</button> : null

              }
              { 
                blogForm()
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