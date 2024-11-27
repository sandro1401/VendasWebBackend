const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Nome da pasta no Cloudinary onde as imagens serão armazenadas
        format: async (req, file) => 'jpg',
        public_id: (req, file) => Date.now().toString() + '-' + file.originalname.split('.')[0],
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
