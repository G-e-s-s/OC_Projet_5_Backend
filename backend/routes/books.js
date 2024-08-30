const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Modele de donnée 
const sharp = require('../middleware/sharp_config');
const multer = require('../middleware/multer_config')
const booksCtrl = require('../controllers/books'); 

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET , POST, PUT, DELETE');
    next();
    }
);

router.get("/", booksCtrl.getAllBooks);
router.post("/", auth, multer, sharp, booksCtrl.createBooks);
router.get("/bestrating", booksCtrl.getBestRating);
router.get("/:id", booksCtrl.getOneBook);
router.put("/:id", auth, multer, sharp, booksCtrl.modifyBooks);
router.delete("/:id", auth, booksCtrl.deleteBooks);
router.post("/:id/rating", auth, booksCtrl.ratingBooks);

module.exports = router;