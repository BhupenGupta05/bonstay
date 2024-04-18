import { useNavigate, useParams } from 'react-router-dom'
import AccountNav from '../components/AccountNav'

const Account = ({user, setUser}) => {
  const navigate = useNavigate()
  const {subpage} = useParams()

  const currentPage = subpage || 'profile'

  const handleLogout = async () => {
    window.localStorage.removeItem('bonstay-token')
    setUser(null)
    navigate('/')
  }

  return (
    <div>
      <AccountNav />
      {currentPage === 'profile' && (
      <div className="text-center max-w-sm mx-auto">
        Logged in as {user?.name} ({user?.email})
        <button onClick={handleLogout} className="primary max-w-sm mt-2">Logout</button>
      </div>
      )}
    </div>
  )
}

export default Account