# Projet

### League Helper

Outil de visualisation de statistiques de jeu pour les joueurs de League of Legends. Permet à un joueur de consulter les statistiques
de son compte ainsi que celles des comptes de ses adversaires s'il est en match.

# Membres de l'équipe de développement
* Adrien Chotard : Dev frontend / Backend
* Jean-Baptiste Martineau : Dev backend
* Laura Texier : Dev frontend
* Thomas Tabuteau : Dev backend / frontend / API

# Technologies utilisées
* VueJS
* ExpressJS
* BootstrapVue

# Limitations connues
* 100 appels à l'API par minute maximum (limite imposée par Riot Games)

# Préparation au lancement

## Téléchargement des dépendances
```
npm install
```

## Renseignement de la clé d'autentification de l'API
Créer un fichier .env.local à la racine du projet sous cette forme:
```
RIOT_API_KEY=<VOTRE_CLE_API>
```

## Démarrage des serveurs (Express pour l'API et Node pour le frontend)
```
npm run serve
```
