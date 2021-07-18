// $ npm install --save-dev @testing-library/react @testing-library/jest-dom
// $ npm test

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

// 5.13
test('renders content', () => {
  const blog = {
    title: 'react-testing-library',
    author: 'reactjs'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('react-testing-library')

  expect(component.container).toHaveTextContent('reactjs')

  expect(component.container).not.toBe('number')

  expect(component.container).not.toHaveTextContent('http')

  const div = component.container.querySelector('.blog')

  expect(div).toHaveTextContent('reactjs')



})