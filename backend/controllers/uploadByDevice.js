const multer = require('multer')
const fs = require('fs')
const { uploadToS3 } = require('../utils/helper')
const uploadDeviceRouter = require('express').Router()

const photosMiddleware = multer({dest:'uploads/'})
uploadDeviceRouter.post('/', photosMiddleware.array('photos', 100), async (req, res) => {
    const uploadedFiles = []
    
    for (let i = 0; i < req.files.length; i++) {
        const {path,originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length-1]
        const newPath = path + '.' + ext
        
        fs.renameSync(path, newPath)

        // Read the file buffer
        const fileBuffer = fs.readFileSync(newPath)

        // Upload the file to S3
        const s3Url = await uploadToS3(fileBuffer, originalname);

        // Add the S3 URL to the list of uploaded files
        uploadedFiles.push(s3Url);
        // uploadedFiles.push(newPath.replace('uploads\\', ''))

        // Optionally, delete the local file after uploading to S3
        fs.unlinkSync(newPath);
    }
    res.json(uploadedFiles)
})

module.exports = uploadDeviceRouter