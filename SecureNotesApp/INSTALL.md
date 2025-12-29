# 🚀 Guide d'installation - Secure Notes App (Mode Résilient)

Bienvenue sur le projet ! Ce document permet d'installer l'environnement complet et de s'assurer que toutes les mesures de sécurité (Confidentialité, Intégrité, Disponibilité) sont opérationnelles.

## 🛠 1. Prérequis
* **Node.js** (Version 22 ou supérieure)
* **Angular CLI** : `npm install -g @angular/cli`
* **PostgreSQL 17** (Assurez-vous que le service est lancé)

## 🗄 2. Initialisation de la Base de Données
1.  Créez la base de données : `CREATE DATABASE secure_notes_db;`
2.  Injectez le schéma présent dans `sqlbd/schema.sql` (contient les tables et la colonne `version` nécessaire au **Locked Mode**).

## ⚙️ 3. Setup du Back-end & Résilience
1.  Allez dans le dossier : `cd back`
2.  Installez les dépendances : `npm install`
3.  Installez le proxy de basculement : `npm install http-proxy`
4.  Configurez le fichier `.env` avec vos identifiants PostgreSQL et une clé `JWT_SECRET`.

## 💻 4. Setup du Front-end (Angular)
1.  Allez dans le dossier : `cd front/secure-notes-app`
2.  Installez les dépendances : `npm install`
3.  **Note** : Le frontend doit pointer vers le Load Balancer (`http://localhost:8080`) pour bénéficier de la haute disponibilité.

## 🔄 5. Workflow de Lancement (Architecture Robuste)

Pour valider les exigences de **Disponibilité**, lancez les terminaux suivants dans l'ordre :

* **Terminal 1 : Serveur A (Primaire)**
  ```bash
  cd back && node server.js

* **Terminal 2 : Serveur B (Secondaire)**
  ```bash
  cd back && PORT=3001 node server.js
* **Terminal 3 : Load Balancer (Aiguilleur)**
  ```bash
  cd back && node load-balancer.js
* **Terminal 4 : Front End**
  ```bash
  cd front && ng serve
