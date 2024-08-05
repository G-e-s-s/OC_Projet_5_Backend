const bcrypt = require('bcrypt');
const user = require('../models/user');

//Enregistrer de nouveaux utilisateurs
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) //crypte le mdp; salt = algorithme de hashage
    .then(hash => {
      const user = new user({ //création du nouvel utilisateur avec mdp crypté
        email: req.body.email,
        password: hash
      });
    user.save() //enregistre l'utilisateur dans la base de données
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) //création de ressources
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

//Connecter utilisateurs existants
exports.login = (req, res, next) => {
    user.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) { //vérification de l'identifiant
                res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'});
            } else {
            bcrypt.compare(req.body.password, user.password) //vérification du mdp
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' });
                    } else {
                        res.status(200).json({
                            userId: user._id,
                            token: 'TOKEN'
                        });
                     };
                })
            .catch(error => res.status(500).json({ error }));
        };
    })
    .catch(error => res.status(500).json({ error }));
}