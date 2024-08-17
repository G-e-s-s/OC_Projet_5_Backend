const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => { //vérification de connexion
   try {
       const token = req.headers.authorization.split(' ')[1]; //Récup du token
       const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET); //Décoder clé secrète + token récupéré
       const userId = decodedToken.userId; //récup de la propriété
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) { //erreur si token invalide
       res.status(401).json({ error });
   }
};