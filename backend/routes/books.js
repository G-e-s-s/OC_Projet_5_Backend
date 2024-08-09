const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router(); //Application Express
const booksCtrl = require('../controllers/books'); // Modele de donnée 

// Fonctions de l'api (route CRUD ?)
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
    }
);

// router.post('/', (req, res, next) => {
//     delete req.body._id;
//     const books = new Books({
//     ...req.body
//     });
//     books.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//     .catch(error => res.status(400).json({ error }));
// });

router.get("/", auth, booksCtrl.getAllBooks);

// router.put('/:id', (req, res, next) => {
//     Books.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
// });

// router.delete('/:id', (req, res, next) => {
//     Books.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//       .catch(error => res.status(400).json({ error }));
// });

module.exports = router;