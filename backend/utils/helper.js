const mime = require('mime-types');
const AWS = require('aws-sdk');

AWS.config.update({ region: 'ap-south-1' });
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadToS3 = async (fileBuffer, fileName) => {
    const mimeType = mime.lookup(fileName) || 'application/octet-stream';

    const params = {
        Bucket: process.env.S3_BUCKET_NAME || 'bonstaybucket',
        Key: fileName,
        Body: fileBuffer,
        ContentType: mimeType
    };

    try {
        const data = await s3.upload(params).promise();
        return data.Location; // Return the URL of the uploaded image
    } catch (error) {
        console.error('Error uploading to S3:', error);
        throw new Error('Failed to upload image to S3');
    }
};

module.exports = { uploadToS3 }
