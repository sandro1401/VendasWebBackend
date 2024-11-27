const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
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
