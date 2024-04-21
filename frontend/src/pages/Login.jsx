import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import loginService from '../services/login'
import profileService from '../services/profile'
import { UserContext } from '../UserContext'


const Login = () => {
  const { setUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return
    }
    try {
      const user = await loginService.login({ email, password })
      localStorage.setItem('bonstay-token', JSON.stringify(user.token))

      const userData = await profileService.profile(user.token)
      setUser(userData)

      alert('Login successful')


      navigate('/')
    } catch (error) {
      setError('Login failed. Please check your credentials.')
      setTimeout(() => {
        setError(null)
      }, 5000)
      console.log(error)
    }
  }



  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <input type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <button className="primary">Login</button>
          {error && <div className="text-red-500">{error}</div>}
          <div className="text-center py-2 text-gray-500">
          Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login