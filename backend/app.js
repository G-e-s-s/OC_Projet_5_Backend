const Books = require('../backend/models/books');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connect("mongodb+srv://Gess:1234@cluster0.3a5k9m7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
    }
);

app.post('/api/books', (req, res, next) => {
    delete req.body._id;
    const books = new Books({
    ...req.body
    });
    books.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

app.use('/api/books', (req, res, next) => {
    Books.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
});

app.put('/api/books/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

app.delete('/api/books/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

module.exports = app;