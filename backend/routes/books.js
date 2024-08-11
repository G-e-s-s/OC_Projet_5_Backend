const express = require('express');
const router = express.Router(); //Application Express
const auth = require('../middleware/auth');
const multer = require('../middleware/multer_config');

const booksCtrl = require('../controllers/books'); // Modele de donnée 

// Fonctions de l'api (route CRUD)
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET , POST, PUT, DELETE');
    next();
    }
);

router.get("/", booksCtrl.getAllBooks);
router.post("/", auth, multer, booksCtrl.createBooks);
router.get("/:id", booksCtrl.getOneBook);
router.put("/:id", auth, multer, booksCtrl.modifyBooks);
router.delete("/:id", auth, booksCtrl.deleteBooks);

module.exports = router;