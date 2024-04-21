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
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    perks: {
        type: Array,
    },
    extraInfo: {
        type: String,
    },
    photos: [String],
    address: {
        type: String,
        required: true,
    },
    maxGuests: {
        type: Number,
        required: true,
    },
    checkIn: {
        type: String,
        required: true,
    },
    checkOut: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
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