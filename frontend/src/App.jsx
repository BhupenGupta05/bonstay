import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Registration from './pages/Register'
import Account from './pages/Account'
import PlaceForm from './pages/PlaceForm'
import Bookings from './pages/Bookings'
import Places from './pages/Places'
import Place from './pages/Place'
import Booking from './pages/Booking'

const App = () => {

  return (
    <div className='flex flex-col gap-2'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/bookings" element={<Bookings />} />
        <Route path="/account/bookings/:id" element={<Booking />} />
        <Route path="/account/places" element={<Places />} />
        <Route path="/account/places/new" element={<PlaceForm />} />
        <Route path="/account/places/:id" element={<PlaceForm />} />
        <Route path="/place/:id" element={<Place />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </div>
  )
}

export default App