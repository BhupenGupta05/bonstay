const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

const placeSchema = new mongoose.Schema({
    owner: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User'
    },
    title: {
        type: String,
        required: [true, 'Title required'],
    },
    description: {
        type: String,
        required: [true, 'Description required'],
    },
    perks: {
        type: Array,
    },
    extraInfo: {
        type: String,
    },
    photos: {
        type: [String],
        required: [true, 'Photos required'],
        min: [3, 'Atleast 3 photos required to add a place']
    },
    address: {
        type: String,
        required: [true, 'Address required'],
    },
    maxGuests: {
        type: Number,
        required: [true, 'Maximum no. of guests required']
    },
    checkIn: {
        type: String,
        required: [true, 'Check-in required'],
    },
    checkOut: {
        type: String,
        required: [true, 'Check-out required'],
    },
    price: {
        type: Number,
        required: [true, 'Price required']
    },
    reviews: [reviewSchema],
})

placeSchema.plugin(uniqueValidator)

placeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  const Place = mongoose.model('Place', placeSchema)
  
  module.exports = Place