const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => { //dossier dans lequel enregistrer fichiers
    callback(null, 'images'); //appeler le callback
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); //Eliminer les espaces et remplacer par les underscore
    const extension = MIME_TYPES[file.mimetype]; //création extension
    callback(null, name + Date.now() + '.' + extension); //Rendre fichier plus unique
  }
});

module.exports = multer({storage: storage}).single('image'); //Afficher un fichier unique