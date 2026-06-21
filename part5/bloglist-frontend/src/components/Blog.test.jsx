import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'


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

  test('Blog only renders title and author by default', () => {
    const { container } = render(<Blog blog={blog} />)
    const element = screen.getByText('Test blog please remove Should not be in frontend')
    expect(element).toBeDefined()

    const details = container.querySelector('.blogDetails')
    expect(details).toBeNull()
  })

  test('Clicking the view button makes the details visible', async () => {
    render(<Blog blog={blog} />)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('urlnotavailable.com')
    expect(url).toBeDefined()
    const likes = screen.getByText('69', { exact: false })
    expect(likes).toBeDefined()
  })

  test('Hitting like button twice causes handleLike to be called twice', async () => {
    const mockHandler = vi.fn()
    
    render(<Blog blog={blog} handleLike={mockHandler} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})