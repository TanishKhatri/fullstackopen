import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { Router } from 'react-router-dom'

describe('Blog tests', () => {
  const blog = {
    title: 'Test blog please remove',
    author: 'Should not be in frontend',
    url: 'urlnotavailable.com',
    likes: 69,
    user: {
      id: '121523151',
      username: 'Body Singh',
      name: 'Big man'
    }
  }

  const correctUser = {
    id: '121523151',
    username: 'Body Singh',
    name: 'Big man'
  }

  const incorrectUser = {
    id: '622543178',
    username: 'small man',
    name: 'small man'
  }

  test('Info and Likes are displayed to unauthenticated, buttons are hidden', () => {
    render(<Blog blog={blog} user={null} />)
    expect(screen.getByText('Test blog please remove')).toBeDefined()
    expect(screen.getByText('By Should not be in frontend')).toBeDefined()
    expect(screen.getByText('urlnotavailable.com')).toBeDefined()
    expect(screen.getByText('likes 69')).toBeDefined()
    expect(screen.queryByRole('button', { name: 'Like' })).toBeNull()
    expect(screen.queryByRole('button', { name: 'Remove' })).toBeNull()
  })

  test('Like is visible on incorrect user', () => {
    render(<Blog blog={blog} user={incorrectUser} />)
    expect(screen.getByText('Test blog please remove')).toBeDefined()
    expect(screen.getByText('By Should not be in frontend')).toBeDefined()
    expect(screen.getByText('urlnotavailable.com')).toBeDefined()
    expect(screen.getByText('likes 69')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Like' })).toBeDefined()
    expect(screen.queryByRole('button', { name: 'Remove' })).toBeNull()
  })

  test('both buttons are visible on correct user', () => {
    render(<Blog blog={blog} user={correctUser} />)
    expect(screen.getByText('Test blog please remove')).toBeDefined()
    expect(screen.getByText('By Should not be in frontend')).toBeDefined()
    expect(screen.getByText('urlnotavailable.com')).toBeDefined()
    expect(screen.getByText('likes 69')).toBeDefined()
    expect(screen.getByRole('button', { name: 'Like' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Remove' })).toBeDefined()
  })
})