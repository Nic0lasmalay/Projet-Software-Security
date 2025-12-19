# 🚀 Guide de démarrage rapide – Secure Notes App

Bienvenue sur le projet !  
Ce document permet d’installer l’environnement complet et de s’assurer que toutes les mesures de sécurité sont opérationnelles.

---

## 🛠 Prérequis

Avant de commencer, assurez-vous d’avoir installé les outils suivants :

- **Node.js** (version 22 ou supérieure)
- **Angular CLI**
  ```bash
  npm install -g @angular/cli

    PostgreSQL 17
    Vérifiez que le service est bien lancé

    Git
    Configuration recommandée pour la gestion des fins de ligne (Windows / Linux) :

    git config --global core.autocrlf true

🗄 Initialisation de la Base de Données

    Ouvrez votre terminal SQL ou un outil comme DBeaver ou pgAdmin

    Créez la base de données :

    CREATE DATABASE secure_notes_db;

    Injectez le schéma de la base (tables users, notes, permissions) :

        Ouvrez le fichier sqlbd/schema.sql présent dans le projet

        Copiez-collez son contenu dans votre éditeur SQL

        Exécutez le script

⚙️ Setup du Back-end (API)

    Accédez au dossier back-end :

cd back

Installez les dépendances :

npm install

Configuration des secrets (CRUCIAL) :

    Créez une copie du fichier modèle :

cp .env.example .env

Ouvrez le fichier .env et complétez les variables suivantes :

    DB_USER=votre_user_postgres
    DB_PASSWORD=votre_mot_de_passe
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=secure_notes_db
    PORT=3000
    JWT_SECRET=une_cle_secrete_aleatoire_et_longue

Testez la connexion à la base de données :

    node config/test-db.js

💻 Setup du Front-end (Angular)

    Accédez au dossier front-end :

cd front/secure-notes-app

Installez les dépendances :

npm install

Lancez le serveur de développement :

ng serve

L’application est accessible à l’adresse :

    http://localhost:4200

🔄 Workflow de Développement

Pour travailler sur le projet, deux terminaux doivent rester ouverts en parallèle :
Service	Emplacement	Commande	Port
Back-end	/back	node server.js	3000
Front-end	/front/secure-notes-app	ng serve	4200
