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
