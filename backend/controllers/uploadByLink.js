const uploadRouter = require('express').Router()
const path = require('path')
const fs = require('fs')
const imageDownloader = require('image-downloader')
const { uploadToS3 } = require('../utils/helper')

uploadRouter.post('/', async (req, res) => {
    const {link} = req.body
    const newName = 'photo' + Date.now() + '.jpg'
    const destPath = path.join(__dirname, '../uploads', newName)

    await imageDownloader.image({
        url: link,
        dest: destPath,
    })

    const fileBuffer = fs.readFileSync(destPath)
    const s3Url = await uploadToS3(fileBuffer, newName);
    
    // res.json({ url: s3Url });
    res.json(s3Url);

    
    fs.unlinkSync(destPath);
})

module.exports = uploadRouter