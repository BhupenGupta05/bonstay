const uploadRouter = require('express').Router()
const path = require('path')
const imageDownloader = require('image-downloader')

uploadRouter.post('/', async (req, res) => {
    const {link} = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    const destPath = path.join(__dirname, '../uploads', newName)

    await imageDownloader.image({
        url: link,
        dest: destPath,
    })
    res.json(newName)
})

module.exports = uploadRouter