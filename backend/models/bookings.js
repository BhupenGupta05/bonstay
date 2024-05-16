const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({ 
    place: {
        type:mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref:'Place'
    },
    user: {
        type:mongoose.Schema.Types.ObjectId, 
        required:[true, 'Please login to book your place'],
        ref: 'User'
    },
    checkIn: {
        type:Date, 
        required:[true, 'Check-in required'],
    },
    checkOut: {
        type:Date, 
        required:[true, 'Check-out required'],
    },
    persons: {
        type: Number,
        required:[true, 'Number of persons is required'],
        min: [1, 'Number of persons must be at least 1'],
    },
    name: {
        type:String, 
        required: true,
    },
    phone: {
        type:String, 
        required: true,
    },
    price: Number,
})

bookingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking