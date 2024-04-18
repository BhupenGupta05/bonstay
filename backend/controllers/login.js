const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
    const {email, password} = req.body

    const registeredUser = await User.findOne({ email })

    const passwordCorrect = registeredUser === null
    ? false
    : await bcrypt.compare(password, registeredUser.passwordHash)

    if (!(registeredUser && passwordCorrect)) {
        return res.status(400).json({
          error: 'invalid email or password'
        })
    }

    const userForToken = {
        email: registeredUser.email,
        id: registeredUser.id,
    }

    const token = jwt.sign(userForToken, process.env.JWT_SECRET)

    res.status(201).send({ 
        token, 
        name: registeredUser.name 
    })
})

module.exports = loginRouter