import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import profileService from './services/profile'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Registration from './pages/Register'
import Account from './pages/Account'
import PlaceForm from './pages/PlaceForm'
import { useEffect, useState } from 'react'
import Bookings from './pages/Bookings'
import Places from './pages/Places'

const App = () => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('bonstay-token');
        const storedToken = JSON.parse(token)
        if (!token) {
          setUser(null)
          setIsLoading(false)
        }
        
        // Fetch user profile using the token
        const userData = await profileService.profile(storedToken);
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      } finally {
        setIsLoading(false)
      }
    };

    fetchUser();
  }, []);
  return (
    <>
    <Navbar user={user} isLoading={isLoading} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/account" element={<Account user={user} setUser={setUser} />} />
      <Route path="/account/bookings" element={<Bookings />} />
      <Route path="/account/places" element={<Places />} />
      <Route path="/account/places/new" element={<PlaceForm />} />
      <Route path="/account/places/:id" element={<PlaceForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
    </>
  )
}

export default App