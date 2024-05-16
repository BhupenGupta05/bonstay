const bookingsRouter = require('express').Router()
const Booking = require('../models/bookings')
const Place = require('../models/place')

bookingsRouter.get('/:id', async (req, res) => {
    const user = req.user;
    const { id } = req.params;

    try {
        const booking = await Booking.findOne({ _id: id, user: user.id }).populate('place');

        res.json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

bookingsRouter.get('/', async (req, res) => {
    const user = req.user
    res.json(await Booking.find({user: user.id}).populate('place'))
})

bookingsRouter.post('/', async (req, res, next) => {
    try {
        const user = req.user
        const {place, checkIn, checkOut, persons, name, phone, price} = req.body

        // Convert check-in and check-out dates to Date objects
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);

        const placeDetails = await Place.findById(place)

        if (!placeDetails) {
            return res.status(404).json({ error: 'Place not found' });
        }

        // Check if persons exceed the maxGuests allowed by the place
        if (persons > placeDetails.maxGuests) {
            return res.status(400).json({ error: 'Number of persons exceeds maximum guests allowed for this place.' });
        }

        if (checkOutDate < checkInDate) {
            return res.status(400).json({ error: 'Check-out date must be greater than or equal to check-in date.' });
        }

        const existingBooking = await Booking.findOne({
            place, 
            user: user.id,
             // Check for overlapping date range
             $or: [
                {
                    checkIn: { $lte: checkOut, $gte: checkIn }
                },
                {
                    checkOut: { $lte: checkOut, $gte: checkIn }
                }
            ]
        })


        if (existingBooking) {
            return res.status(400).json({ error: 'Booking already exists for the same place or date range.' });
        }
    
        const booking = new Booking({
        place, checkIn, checkOut, persons, name, phone, user: user.id, price
        })

        const newBooking = await booking.save()

        user.bookings.push(newBooking.id)
        await user.save()
    
        res.json(newBooking)
    } catch (error) {
        // res.status(500).json({error: error.message})
        next(error);
    }
})

bookingsRouter.put('/:id', async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { checkIn, checkOut, persons } = req.body;

        const booking = await Booking.findOne({ _id: id, user: user.id });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Update booking details with new dates and persons
        booking.checkIn = new Date(checkIn);
        booking.checkOut = new Date(checkOut);
        booking.persons = persons;

        // Fetch the place associated with the booking
        const placeData = await Place.findById(booking.place);
        if (!placeData) {
            return res.status(404).json({ error: 'Place not found' });
        }

        // Check if persons exceed the maxGuests allowed by the place
        if (booking.persons > placeData.maxGuests) {
            return res.status(400).json({ error: 'Number of persons exceeds maximum guests allowed for the place.' });
        }

        // Check for overlapping bookings for the same place and user
        const overlappingBooking = await Booking.findOne({
            _id: { $ne: id }, // Exclude the current booking from the check
            place: booking.place,
            user: user.id,
            $or: [
                { checkIn: { $lte: new Date(checkOut), $gte: new Date(checkIn) } },
                { checkOut: { $lte: new Date(checkOut), $gte: new Date(checkIn) } }
            ]
        });

        if (overlappingBooking) {
            return res.status(400).json({ error: 'Booking already exists for the same place and date range.' });
        }

        const updatedBooking = await booking.save();

        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

bookingsRouter.delete('/:id', async (req, res) => {
    try {
        const user = req.user
        const bookingId = req.params.id

        const booking = await Booking.findById(bookingId)

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Check if the booking belongs to the user making the request
        if (booking.user.toString() !== user.id) {
            return res.status(403).json({ error: 'Not authorized to delete this booking' });
        }

        await Booking.findByIdAndDelete(bookingId);

        res.json({ message: 'Booking successfully deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


module.exports = bookingsRouter