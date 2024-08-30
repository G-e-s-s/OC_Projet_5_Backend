# OC_Projet_5_Backend
# Mon vieux Grimoire
Les librairies “Au Vieux Grimoire“ comptent de nombreux clients passionnés. 
L’objectif du site “Mon Vieux Grimoire” est de donner la possibilité aux lecteurs de créer des livres, de les noter et de consulter les livres existants ainsi que leurs notes.

## Comment lancer le projet ? 
## Avec npm en frontend
Faites la commande `npm install` pour installer les dépendances puis `npm start` pour lancer le projet. 
## Avec nodemon en backend
Faites la commande `nodemon server` pour lancer le projet côté backend. 

### Architecture générale
L’application web est composée de 4 pages :
    ● Une page pour permettre l’inscription / la connexion des utilisateurs ;
    ● Une page d’accueil présentant les livres déjà ajoutés par les utilisateurs (visible en étant connecté ou non) ;
    ● Une page “livre” présentant toutes les informations sur un livre proposé (visible en étant connecté ou non) ;
    ● Une page permettant aux utilisateurs d’ajouter de nouveaux livres à la plateforme (visible seulement aux utilisateurs connectés).

#### Informations complémentaires
#### Page connexion/inscription
Cette page est assez simple ; elle contient :
    ● Deux champs de saisie : un champ “mail” et un champ “mot de passe” ;
    ● Seux boutons : un bouton “inscription” et un bouton “connexion”.
#### Header
Dans le header, nous retrouvons le logo de l’entreprise, ainsi qu’un menu.
Ce menu présente les liens suivants :
    ● “Accueil” : dirige vers la page d’accueil ;
    ● “Créer un livre” : dirige vers la page de création d’un livre ;
    ● “Déconnexion” : celui-ci permet à l’utilisateur de se déconnecter de la plateforme, avant d’être redirigé sur la page de connexion/inscription.
Nous retrouvons le header dans toutes les pages, mis à part la page de connexion/inscription.
#### Footer
Dans le footer, nous retrouvons l’adresse, le numéro de téléphone, un visuel d’une carte, ainsi que le copyright.
Nous retrouvons le footer dans toutes les pages, mis à part la page de connexion/inscription.
#### Page d’accueil
La page d’accueil présente la liste de l’ensemble des ouvrages ayant été ajoutés par les utilisateurs. Cette page est visible par tous les visiteurs, qu’ils soient connectés ou non.
Pour chaque ouvrage apparaît l’image ainsi que le titre de celui-ci.
Dans la première version de la plateforme, il n’y aura pas de pagination.
#### Page livre
Dans cette page, nous retrouvons l’intégralité des informations rattachées à un livre, c'est-à-dire : image, titre, auteur, année, genre et note moyenne.
La note moyenne est une évaluation faite sur 5.
Un utilisateur a la possibilité de renseigner une note, entre 0 et 5 étoiles.
`Cas spécifique` : Si l’utilisateur qui consulte un livre est le créateur de celui-ci sur la plateforme, cet utilisateur a 2 boutons supplémentaires à sa disposition, un bouton pour supprimer le livre, et un autre pour le modifier.
#### Page de création de livre
Dans cette page, les utilisateurs ont la possibilité de créer un livre en lui renseignant toutes les informations nécessaires, c'est-à-dire : image (champ d’upload d’une image), titre, auteur, année et genre.
Un bouton de validation / création permet de confirmer la création du livre une fois toutes les informations saisies.

##### Structure du fichier .env
##### Connexion à Mongoose.connect
process.env.CNX_DB
CNX_DB = '***'
##### Récupération token pour se connecter/s'inscrire
process.env.TOKEN_SECRET
TOKEN_SECRET = '***'
