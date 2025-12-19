🚀 Guide de démarrage rapide - Secure Notes App

Bienvenue sur le projet ! Ce document permet d'installer l'environnement complet et de s'assurer que toutes les mesures de sécurité sont opérationnelles.
🛠 1. Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

    Node.js (Version 22 ou supérieure)

    Angular CLI : npm install -g @angular/cli

    PostgreSQL 17 (Vérifiez que le service est lancé)

    Git : Configurez la gestion des fins de ligne pour Windows/Linux :
    Bash

    git config --global core.autocrlf true

🗄 2. Initialisation de la Base de Données

    Ouvrez votre terminal SQL ou un outil comme DBeaver / pgAdmin.

    Créez la base de données :
    SQL

    CREATE DATABASE secure_notes_db;

    Injectez le schéma (tables users, notes, permissions) :

        Ouvrez le fichier sqlbd/schema.sql présent dans le projet.

        Copiez-collez son contenu dans votre éditeur SQL et exécutez-le.

⚙️ 3. Setup du Back-end (API)

    Allez dans le dossier : cd back

    Installez les dépendances : npm install

    Configuration des secrets (CRUCIAL) :

        Créez une copie du fichier modèle : cp .env.example .env

        Ouvrez le fichier .env et remplissez vos identifiants locaux :
        Plaintext

    DB_USER=votre_user_postgres
    DB_PASSWORD=votre_mot_de_passe
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=secure_notes_db
    PORT=3000
    JWT_SECRET=une_cle_secrete_aleatoire_et_longue

Testez la connexion :
Bash

    node config/test-db.js

💻 4. Setup du Front-end (Angular)

    Allez dans le dossier : cd front/secure-notes-app

    Installez les dépendances : npm install

    Lancez le serveur de développement : ng serve

    L'interface est accessible sur : http://localhost:4200

🔄 5. Workflow de Développement

Pour travailler sur le projet, vous devez maintenir deux terminaux ouverts :
un dans /back et faire node server.js
un dans /front et faire ng serve
