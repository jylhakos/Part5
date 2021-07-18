
import React, { useState } from 'react'

//import Togglable from './Togglable'

import blogService from '../services/blogs'

// 5.6
const BlogForm = (props) => {

  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newInfo, setNewInfo] = useState(null)

  const addBlog = (event) => {

    event.preventDefault()

    console.log('Clicked', event.target)

    /*const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user._id
    }*/

    props.createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
      //user: props.user._id
    })

    //console.log('blogObject', blogObject.title, blogObject.author, blogObject.url)

    /*blogService.create(blogObject)
    .then(response => {
      console.log('response', response)
    })*/

    //blogService.getAll().then(blogs => setBlogs( blogs ))

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')

    //setNewInfo(`The blog ${blogObject.title} is created by ${blogObject.author}`)

    //setTimeout(() => {
    //  setNewInfo(null)
    //}, 5000)
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

  return (
        <form onSubmit={addBlog}>
          <div>
            <div>
              <label>Title: </label><input name="title" value={newTitle} onChange={handleTitleChange}/>
            </div>
            <div>
              <label>Author: </label><input name="author" value={newAuthor} onChange={handleAuthorChange}/>
            </div>
            <div>
              <label>Url: </label><input name="url" value={newUrl} onChange={handleUrlChange}/>
            </div>
          </div>
            <div><button name="create" type="submit">Create</button></div>
        </form>
  )}

export default BlogForm