import AccountNav from '../components/AccountNav'
import PhotosUploader from '../components/PhotosUploader'
import Perks from '../components/Perks'
import { useEffect, useState } from 'react'
import placeService from '../services/place'
import { useNavigate, useParams } from 'react-router-dom'

const PlaceForm = () => {
    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [photos, setPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const [loading, setLoading] = useState(true) // Loading state

    const navigate = useNavigate()

    useEffect(() => {
        const fetchPlaceById = async () => {
            const token = localStorage.getItem('bonstay-token')
            if (token) {
                const storedToken = JSON.parse(token)
                const data = await placeService.getPlace(storedToken, id)

                if (data) {
                    setTitle(data.title)
                    setAddress(data.address)
                    setPhotos(data.photos)
                    setDescription(data.description)
                    setPerks(data.perks)
                    setExtraInfo(data.extraInfo)
                    setCheckIn(data.checkIn)
                    setCheckOut(data.checkOut)
                    setMaxGuests(data.maxGuests)
                    setPrice(data.price)
                }
            }
            setLoading(false) // Set loading to false when data is loaded
        }

        if (id) {
            fetchPlaceById()
        } else {
            setLoading(false)
        }
    }, [id])

    if (loading) {
        // Display loading indicator while data is being loaded
        return (
            <div className="text-center mt-4">
                <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41-1.41M4.93 19.07l1.41-1.41M16.24 7.76l1.41 1.41M2 12h2M20 12h2M4.93 12h2.14M16.24 12h2.14" />
                </svg>
                <p className="text-primary text-md mt-2">Loading place data...</p>
            </div>
        )
    }

    const inputHeader = (text) => {
        return (
            <h2 className="text-lg mt-4 md:text-xl">{text}</h2>
        )
    }

    const inputDescription = (text) => {
        return (
            <p className="text-gray-500 text-xs md:text-sm">{text}</p>
        )
    }

    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    const savePlace = async (event) => {
        event.preventDefault()

        const token = localStorage.getItem('bonstay-token')
        const storedToken = JSON.parse(token)

        const place = { title, address, description, perks, extraInfo, photos, checkIn, checkOut, maxGuests, price }

        if (id) {
            // Update the place
            await placeService.updatePlace(storedToken, id, place)
        } else {
            // Add new place
            await placeService.addPlace(storedToken, place)
        }
        navigate('/account/places')
    }

    return (
        <div>
            <AccountNav />
            <form onSubmit={savePlace} className="mx-4 md:mx-10">

                {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for example: My lovely apt" className='text-xs md:text-sm'/>

                {preInput('Address', 'Address to this place')}
                <input type="text" value={address} onChange={e => setAddress(e.target.value)}placeholder="address" className='text-xs md:text-sm'/>

                {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={photos} onChange={setPhotos} />

                {preInput('Description', 'description of the place')}
                <textarea value={description} onChange={e => setDescription(e.target.value)} className='text-xs md:text-sm' />

                {preInput('Perks', 'select all the perks of your place')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                {preInput('Extra info', 'house rules, etc')}
                <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} className='text-xs md:text-sm' />

                {preInput('Check in & out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="text-sm mt-2 sm:-mb-1">Check in time</h3>
                        <input className='text-xs md:text-sm' type="text" value={checkIn} onChange={e => setCheckIn(e.target.value)} placeholder="12:00" />
                    </div>
                    <div>
                        <h3 className="text-sm mt-2 sm:-mb-1">Check out time</h3>
                        <input className='text-xs md:text-sm' type="text" value={checkOut} onChange={e => setCheckOut(e.target.value)} placeholder="9:00" />
                    </div>
                    <div>
                        <h3 className="text-sm mt-2 sm:-mb-1">Max no. of guests</h3>
                        <input className='text-xs md:text-sm' type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} />
                    </div>
                    <div>
                        <h3 className="text-sm mt-2 sm:-mb-1">Price per night</h3>
                        <input className='text-xs md:text-sm' type="number" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>
                <button className="text-sm tracking-wide primary my-4 md:text-base">Save</button>
            </form>
        </div>
    )
}

export default PlaceForm
