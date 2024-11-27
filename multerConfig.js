const multer = require('multer');
const path = require('path');

// Configuração do storage do multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome do arquivo salvo
    }
});

// Configuração do multer para aceitar apenas imagens
const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Apenas imagens são permitidas!"));
    }
});

module.exports = upload;


// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const sharp = require('sharp');

// // Configuração do multer para armazenar o arquivo em memória
// const storage = multer.memoryStorage();

// const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         const filetypes = /jpeg|jpg|png/;
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb(new Error("Apenas imagens são permitidas!"));
//     }
// });

// const processImages = async (req, res, next) => {
//     if (!req.files || req.files.length === 0) {
//         console.error("Nenhum arquivo foi enviado.");
//         return next(new Error("Nenhum arquivo foi enviado."));
//     }

//     try {
//         const processedImages = [];

//         for (const file of req.files) {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             const filename = `${uniqueSuffix}.jpg`;
//             const outputPath = path.join('uploads', filename);

//             // Redimensionar e salvar a imagem
//             await sharp(file.buffer)
//                 .resize(600, 600, {
//                     fit: 'contain', 
//                     background: { r: 255, g: 255, b: 255 }})
//                 .toFormat('jpg')
//                 .toFile(outputPath);

//             // Adicionar o caminho da imagem processada ao array
//             processedImages.push(outputPath);
//         }

//         // Atualiza req.files com os caminhos processados
//         req.processedImages = processedImages;

//         next();
//     } catch (error) {
//         console.error("Erro ao processar imagens:", error);
//         next(error);
//     }
// };


// module.exports = {
//     upload,
//     processImages
// };
