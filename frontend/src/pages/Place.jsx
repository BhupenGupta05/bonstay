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
    const [loading, setLoading] = useState(true) // Loading state

    useEffect(() => {
        const fetchPlaceAndBooking = async () => {
            // Fetch place data
            const data = await placeService.fetchPlace(id)
            setPlace(data)

            // Fetch booking data if there is a token
            const token = localStorage.getItem('bonstay-token')
            if (token) {
                const storedToken = JSON.parse(token)
                const bookingDetails = await bookingService.getBooking(storedToken, id)

                if (bookingDetails) {
                    setBookingData({
                        bookingId: bookingDetails.id,
                        checkIn: bookingDetails.checkIn,
                        checkOut: bookingDetails.checkOut,
                        persons: bookingDetails.persons,
                    })
                }
            }
            setLoading(false) // Set loading to false when data is loaded
        }

        if (!id) {
            return
        }
        fetchPlaceAndBooking()
    }, [id])

    if (loading) {
        // Display loading indicator while data is being loaded
        return (
            <div className="text-center mt-4">
                <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41-1.41M4.93 19.07l1.41-1.41M16.24 7.76l1.41 1.41M2 12h2M20 12h2M4.93 12h2.14M16.24 12h2.14" />
                </svg>
                <p className="text-primary mt-2">Loading place...</p>
            </div>
        )
    }

    return (
        <div className="mt-8 bg-gray-100 px-8 pt-8">
            <h1 className="text-3xl mx-4">{place?.title}</h1>
            <a className="my-2 mx-4 flex items-center gap-1 font-semibold underline" href={`https://maps.google.com/?q=${place.address}`} target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width={10} height={10}>
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" fill="currentColor" />
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
                    Check In: {place.checkIn}<br />
                    Check Out: {place.checkOut}<br />
                    Max no. of guests: {place.maxGuests}
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
