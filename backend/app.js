const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');

const booksRoutes = require('../backend/routes/books');
const userRoutes = require('../backend/routes/user')

// Connection à la base de donnée
mongoose.connect("mongodb+srv://Gess:1234@cluster0.3a5k9m7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;