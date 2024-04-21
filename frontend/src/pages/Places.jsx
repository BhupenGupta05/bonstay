import { useEffect } from 'react'
import AccountNav from '../components/AccountNav'
import { Link } from 'react-router-dom'
import placeService from '../services/place'
import { useState } from 'react'

const Places = () => {
  const [places, setPlaces] = useState([])
  const [expandedDescriptions, setExpandedDescriptions] = useState([])

  useEffect(() => {
    const fetchPlaces = async () => {
      const token = localStorage.getItem('bonstay-token')
      const storedToken = JSON.parse(token)
      const data = await placeService.getPlaces(storedToken)
      setPlaces(data)
    }

    fetchPlaces()
  },[])

  const toggleDescription = (index) => {
    setExpandedDescriptions(prevState => {
      const newState = [...prevState]
      newState[index] = !newState[index]
      return newState
    })
  }

  return (
    <div className="mx-4">
      <AccountNav />
      <div className="text-center">
        <Link to={'/account/places/new'} className="inline-flex items-center gap-2 bg-primary text-white rounded-full py-2 px-6">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={16} height={16}>
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" fill="white"/>
          </svg>
                Add new place
        </Link>
      </div>

      <div className="mt-4">
        {places.length > 0 && places.map((place, index) => (
          <Link to={`/account/places/${place.id}`} key={place.id} className="inline-flex gap-4 bg-gray-200 rounded-2xl cursor-pointer p-4 mt-4 min-w-full">
            <div className="flex w-36 h-36 bg-gray-100 shrink-0">
              {place.photos.length > 0 && (
                <img src={`http://localhost:5000/uploads/${place.photos[0]}`} className='object-cover rounded-md w-full h-full' alt="" />
              )}
            </div>
            <div className="grow-0 shrink">
              <h2 className="text-xl">{place.title}</h2>

              {expandedDescriptions[index] ? (
                <p className="text-sm mt-2">{place.description}</p>
              ) : (
                <p className="text-sm mt-2">{place.description.substring(0, 200)}...</p>
              )}

              {/* Render "Read more" link if description is long */}
              {place.description.length > 200 && (
                <button onClick={() => toggleDescription(index)} className="text-blue-500 underline mt-1">
                  {expandedDescriptions[index] ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
          </Link>
        ))
        }
      </div>
    </div>
  )
}

export default Places