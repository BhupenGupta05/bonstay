import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import placeService from '../services/place'
import bookingService from '../services/bookings'
import PlaceGallery from '../components/PlaceGallery'
import BookingWidget from '../components/BookingWidget'

const Place = () => {
  const { id } = useParams()
  const [place, setPlace] = useState(null)
  const [bookingData, setBookingData] = useState(null)

  useEffect(() => {
    const fetchPlaceandBooking = async () => {
      const data = await placeService.fetchPlace(id)
      setPlace(data)

      const token = localStorage.getItem('bonstay-token')
      const storedToken = JSON.parse(token)

      const bookingDetails = await bookingService.getBooking(storedToken, id)

      if(bookingDetails) {
        setBookingData({
          bookingId: bookingDetails.id,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          persons: bookingData.persons
        })
      }
    }

    if(!id) {
      return
    }
    fetchPlaceandBooking()
  }, [id])

  if(!place) {
    return (
      <div>
                Loading...
      </div>
    )
  }
  return (
    <div className="mt-8 bg-gray-100 px-8 pt-8">
      <h1 className="text-3xl mx-4">{place?.title}</h1>
      <a className="my-2 mx-4 flex items-center gap-1 font-semibold underline" href={`https://maps.google.com/?q=${place.address}`} target="_blank" rel="noreferrer" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={10} height={10}>
          <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
        </svg>
        {place.address}
      </a>
      <div className="m-4">
        <PlaceGallery place={place} />
      </div>


      <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] mx-4">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
                Check In : {place.checkIn}<br/>
                Check Out : {place.checkOut}<br/>
                Max no. of guests : {place.maxGuests}
        </div>

        <div>
          <BookingWidget place={place} bookingData={bookingData} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div className="m-4">
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="text-sm text-gray-700 leading-5 my-1 mx-4">{place.extraInfo}</div>
      </div>




    </div>
  )
}

export default Place