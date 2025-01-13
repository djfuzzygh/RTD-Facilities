import { render, screen, waitFor } from '@/test/utils'
import RequestsPage from './page'
import userEvent from '@testing-library/user-event'

describe('RequestsPage', () => {
  it('renders requests table', async () => {
    render(<RequestsPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Test request')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Vehicle')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<RequestsPage />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('navigates to new request page', async () => {
    render(<RequestsPage />)
    const user = userEvent.setup()
    
    await user.click(screen.getByText('New Request'))
    
    // Add navigation assertion based on your routing setup
  })
}) 