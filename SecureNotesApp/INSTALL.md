📁 Guide d'Installation - Secure Notes App

Ce guide explique comment installer l'environnement de développement pour les trois composants du projet : Front-end, Back-end et SQL.
🛠 1. Prérequis

Avant de commencer, assurez-vous d'avoir installé :

    Node.js (version 22+)

    Angular CLI (npm install -g @angular/cli)

    PostgreSQL 17

🗄 2. Configuration de la Base de Données (sqldb)

    Ouvrez votre outil SQL (psql ou DBeaver).

    Créez la base de données :
    SQL

    CREATE DATABASE secure_notes_db;

    Exécutez le script d'initialisation situé dans le projet :

        Ouvrez le fichier sqlbd/schema.sql.

        Copiez-collez son contenu dans votre éditeur SQL et exécutez-le.

        Note : Cela créera les tables users, notes et permissions.

⚙️ 3. Installation du Back-end (back)

    Allez dans le dossier back :
    Bash

cd back

Installez les dépendances :
Bash

npm install

Configuration Sécurisée (CRUCIAL) :

    Copiez le fichier modèle : cp .env.example .env (ou faites un copier-coller manuel).

    Modifiez le fichier .env avec votre mot de passe PostgreSQL local.

    Ne jamais commiter le fichier .env sur Git.

Testez la connexion :
Bash

    node config/test-db.js

💻 4. Installation du Front-end (front)

    Allez dans le dossier front :
    Bash

cd front/secure-notes-app

Installez les dépendances Angular :
Bash

npm install

Lancez l'application :
Bash

    ng serve

    L'application est disponible sur http://localhost:4200.

🚀 5. Workflow de Développement

    Lancer le Back : npm start (dans le dossier /back).

    Lancer le Front : ng serve (dans le dossier /front).

    Git : Avant de pousser votre code, vérifiez que vous ne poussez pas de fichiers sensibles (le .gitignore à la racine s'en occupe normalement).