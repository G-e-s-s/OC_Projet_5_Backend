const Books = require('../models/books');

exports.getAllBooks = (req, res, next) => {
  Books.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};

exports.createBooks = (req, res, next) => {
  console.log(req.body);
  const booksObject = JSON.parse(req.body.book);
  delete booksObject._id; //suppression de l'id
  delete booksObject._userId; //suppression de requete envoye par le client
  const books = new Books({
      ...booksObject,
      userId: req.auth.userId, //extraire requete envoye
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //generer l'url de l'image
  });
  console.log(books);
  books.save()
  .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};