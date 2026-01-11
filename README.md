# 🛡️ Secure Notes App - Documentation de Déploiement (Groupe 1)

Ce projet est une application web sécurisée de gestion de notes, conçue pour démontrer les principes de **Confidentialité**, **Intégrité** et **Disponibilité** (Piliers CIA).

---

## 🛠️ 1. Prérequis Système
Avant de commencer, assurez-vous d'avoir installé les outils suivants :
* **Node.js** (Version 22 ou supérieure).
* **Angular CLI** : `npm install -g @angular/cli`.
* **PostgreSQL 17** : Le service doit être actif sur votre machine.
* **Git** (Optionnel) : Pour la gestion des fins de ligne.

---

## 🗄️ 2. Initialisation de la Base de Données
1. **Création de la base** : Ouvrez votre terminal SQL ou un outil comme pgAdmin et exécutez :
   ```sql
   CREATE DATABASE secure_notes_db;
2.  Injectez le schéma présent dans `sqlbd/schema.sql` (contient les tables et la colonne `version` nécessaire au **Locked Mode**).

## ⚙️ 3. Configuration de l'Environnement (.env)

Un fichier de configuration est requis pour le fonctionnement du backend.

1. Allez dans le dossier back/.

2. Vérifiez la présence du fichier .env. Si absent, créez-le à partir de .env.example :

   `cp .env.example .env`

3. Modifiez les variables suivantes selon vos identifiants PostgreSQL locaux dans le fichier .env de cette manière :
   `DB_USER=votre_user_postgres
   DB_PASSWORD=votre_mot_de_passe
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=secure_notes_db
   JWT_SECRET=votre_cle_secrete_jwt`

## 🚀 4. Lancement de l'Application

Pour automatiser le déploiement de l'architecture résiliente, un script de lancement est fourni à la racine du projet.

1. Double-cliquez sur le fichier : start.bat.

2. Ce script va ouvrir automatiquement 4 terminaux :

     * Serveur A (Port 3000) : Instance backend primaire.

     * Serveur B (Port 3001) : Instance de secours (Réplication).

     * Load Balancer (Port 8080) : Point d'entrée unique gérant le basculement.

     * Angular Frontend : Interface accessible sur http://localhost:4200.

## 🛡️ 5. Validation des Mesures de Sécurité

Pour tester la robustesse du système, vous pouvez effectuer les scénarios suivants :

 1. Disponibilité (Résilience) :

     Fermez la fenêtre du terminal Serveur 3000.

     Utilisez l'application (ajout/consultation de notes). Le Load Balancer redirigera automatiquement le trafic vers le serveur 3001 sans interruption.

 2. Intégrité (Locked Mode) :

     Ouvrez la même note dans deux onglets différents du navigateur.

     Modifiez et enregistrez la note dans le premier onglet.

     Tentez d'enregistrer une modification dans le second onglet : une erreur de conflit (409) doit apparaître.

 3. Confidentialité (Contrôle d'Accès) :

     Connectez-vous avec deux utilisateurs différents.

     Vérifiez qu'il est impossible de consulter ou supprimer l'ID d'une note appartenant à un autre utilisateur (Erreur 404).

