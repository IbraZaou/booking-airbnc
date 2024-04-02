const path = require('path');
const imageDownloader = require('image-downloader');
const multer = require('multer');


// Endpoint Upload by link
const uploadByLink = async (req, res) => {
    const { link } = req.body;
    const newName = Date.now() + '.jpg';

    if (!link.match(/\.(jpg|jpeg)$/i)) {
        return res.status(400).json({ message: 'Seuls les fichiers JPG ou JPEG sont acceptés' });
    }

    try {
        await imageDownloader.image({
            url: link,
            dest: path.join(__dirname, '../uploads', newName),
        });

        const imagePath = path.join(newName);

        res.json({ imagePath });
    } catch (error) {
        return res.status(400).json({ message: 'Entrez un lien valide' });
    }
};




// Configuration de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const parts = file.originalname.split('.');
        const ext = parts[parts.length - 1];
        const newFilename = `${Date.now()}_${Math.floor(Math.random() * 10000)}.${ext}`;
        cb(null, newFilename);
    },
});

const photosMiddleware = multer({ storage }).array('photos', 100);

// Fonction de gestion de l'upload par ordinateur
const uploadByComputer = (req, res) => {
    photosMiddleware(req, res, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de l\'upload des images' });
        }

        const uploadedFiles = req.files.map((file) => file.filename);

        res.json(uploadedFiles);
    });
};

module.exports = { uploadByLink, uploadByComputer };
