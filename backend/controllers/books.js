const Books = require('../models/books');
const fs = require('fs');

//GET
exports.getAllBooks = (req, res, next) => { 
  Books.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(500).json({ error }));
};

exports.getOneBook = (req, res, next) => {
  Books.findOne({ _id: req.params.id })
    .then(books => res.status(200).json(books))
    .catch(error => res.status(404).json({ error }));
};

exports.getBestRating = (req, res, next) => {
  Books.find()
    .then((books) => {
      books.sort((book1, book2) => book2.averageRating - book1.averageRating); //trie le tableau
      const bestBooks = [];
      for(let index = 0; index < 3 || index < books.length ; index++){
        bestBooks.push(books[index]);
      }
      res.status(200).json(bestBooks);
    })
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
    .catch(error => { res.status(500).json( { error })})
};

exports.ratingBooks = (req, res, next) => {
  Books.findOne({ _id: req.params.id })
    .then(books => {
      if(books.ratings.find((param) => {return req.auth.userId === param.userId}) === undefined){
        const newElement = {
          userId : req.auth.userId,
          grade: req.body.rating
        };
        const newBook = books;

        // Rajout de la nouvelle note
        const newTab = books.ratings;
        newTab.push(newElement);
        newBook.ratings = newTab;

        //Calcul de la note moyenne d'un livre
        let sum = 0;
        newTab.forEach((element) => sum += element.grade); // sum devient la somme de toutes les notes attribuées
        newBook.averageRating = sum/newTab.length;

        Books.updateOne({ _id: req.params.id}, {ratings: newTab, averageRating: newBook.averageRating}) //mise à jour de l'enregistrement
          .then(() => res.status(200).json(newBook))
          .catch(error => res.status(401).json({ error }));
      } else {
        res.status(403).json({message : "Not authorized"});
      }
    }
    )
  .catch(error => res.status(404).json({ error }));
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
          res.status(403).json({ message : 'Not authorized'});
      } else {
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => { //passer le fichier à supprimer et le callback à exécuter avec package fs
          Books.updateOne({ _id: req.params.id}, { ...booksObject, _id: req.params.id}) //mise à jour de l'enregistrement
          .then(() => res.status(200).json({message : 'Livre modifié !'}))
          .catch(error => res.status(401).json({ error }));
      });
      }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
};

//DELETE
exports.deleteBooks = (req, res, next) => {
  Books.findOne({ _id: req.params.id}) //verification de l'id
  .then(book => {
    if (book.userId != req.auth.userId) {
      res.status(403).json({message: 'Not authorized'});
    } else {
      const filename = book.imageUrl.split('/images/')[1]; //séparer le nom du fichier grace aux segments
      fs.unlink(`images/${filename}`, () => { //passer le fichier à supprimer et le callback à exécuter avec package fs
        Books.deleteOne({_id: req.params.id})
          .then(() => { res.status(200).json({message: 'Livre supprimé !'})})
          .catch(error => res.status(401).json({ error }));
      });
    }
  })
  .catch( error => {
    res.status(500).json({ error });
  });
};