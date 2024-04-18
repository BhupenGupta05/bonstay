const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
    try {
        const {name, email, password, 
            phone, address} = req.body

        const requiredFields = ['name', 'password', 'email', 'phone', 'address']

        for (const field of requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({ error: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.` })
            }
        }

        if(password.length < 5) {
            return res.status(400).json({ error: "Password should have minimum 5 and maximum 10 characters" })
        }

        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return res.status(400).json({ error: "User exists with this email id" })
        }
        
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        
        const user = new User({
            name,
            email,
            passwordHash,
            phone, 
            address,
            bookings: []
        })
        
        const savedUser = await user.save()
        
        res.status(201).json(savedUser)
    
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter