const books = require('../models/books');
const Books = require('../models/books');

//GET
exports.getAllBooks = (req, res, next) => { 
  Books.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Books.findOne({ _id: req.params.id })
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ error }));
};

//POST
exports.createBooks = (req, res, next) => {
  const booksObject = JSON.parse(req.body.book);
  delete booksObject._id; //suppression de l'id
  delete booksObject._userId; //suppression de requete envoye par le client
  const books = new Books({
      ...booksObject,
      userId: req.auth.userId, //extraire requete envoye
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //generer l'url de l'image
  });
  books.save()
  .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

//PUT
exports.modifyBooks = (req, res, next) => {
  const booksObject = req.file ? { //savoir si requte avec un fichier
      ...JSON.parse(req.body.book), //si fichier, recreer une image
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }; //si pas de fichier : objet transmit dans le corps de la requete

  delete booksObject._userId; //suppression de l'userId
  Books.findOne({_id: req.params.id}) //bon utilisateur qui cherche à modifier ?
      .then((book) => { //vérification du bon utilisateur qui envoie la requete
          if (book.userId != req.auth.userId) { //id correspondant à l'utilisateur ?
              res.status(401).json({ message : 'Not authorized'});
          } else {
              Books.updateOne({ _id: req.params.id}, { ...booksObject, _id: req.params.id}) //mise à jour de l'enregistrement
              .then(() => res.status(200).json({message : 'Livre modifié !'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });
};

//DELETE
exports.deleteBooks = (req, res, next) => {
  Books.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};