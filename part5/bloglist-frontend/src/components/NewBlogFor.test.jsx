import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

test('All inputs of the form work', async () => {
  const handleCreation = vi.fn()
  const user = userEvent.setup()

  render(<NewBlogForm handleCreation={handleCreation} />)

  const titleInput = screen.getByLabelText('title:', { exact: false })
  const authorInput = screen.getByLabelText('author:', { exact: false })
  const urlInput = screen.getByLabelText('url:', { exact: false })
  await user.type(titleInput, 'This is the title')
  await user.type(authorInput, 'Author stuff')
  await user.type(urlInput, 'example.com')

  const submitButton = screen.getByText('create')
  await user.click(submitButton)

  expect(handleCreation.mock.calls[0][0].title).toBe('This is the title')
  expect(handleCreation.mock.calls[0][0].author).toBe('Author stuff')
  expect(handleCreation.mock.calls[0][0].url).toBe('example.com')
})