import { useState } from 'react'
import './App.css'

function App() {
  // State to toggle between login and register forms
  const [isLogin, setIsLogin] = useState(true)
  
  // Form data state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  })
  
  // Response message state
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')
    
    // Choose endpoint based on form type
    const endpoint = isLogin ? 'login' : 'register'
    
    // Prepare data to send
    const dataToSend = isLogin 
      ? { email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password, name: formData.name }
    
    try {
      const response = await fetch(`http://localhost:3000/api/v1/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Store token in localStorage
        const token = data.userToken || data.token
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(data.user))
        
        setMessage(`Success! Welcome ${data.user.name}`)
        setFormData({ email: '', password: '', name: '' })
      } else {
        setError(data.message || 'An error occurred')
      }
    } catch (err) {
      setError('Server connection error: ' + err.message)
    }
  }

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Toggle between login and register
  const toggleForm = () => {
    setIsLogin(!isLogin)
    setMessage('')
    setError('')
    setFormData({ email: '', password: '', name: '' })
  }

  return (
    <div className="app-container">
      <div className="auth-card">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
          
          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <button onClick={toggleForm} className="toggle-btn">
          {isLogin ? "Don't have an account? Register" : 'Already have an account? Login'}
        </button>

        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}
      </div>
    </div>
  )
}

export default App
