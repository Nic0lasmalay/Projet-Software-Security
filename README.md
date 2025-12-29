📝 Gestionnaire de Notes Sécurisé (Groupe 1)

Ce projet est une application web de gestion de notes textuelles personnelles, conçue pour offrir un stockage résilient et une sécurité rigoureuse conformément aux principes du développement logiciel "acceptablement sécurisé".

🚀 Fonctionnalités Principales

Stockage Personnel Isolé : Chaque utilisateur peut créer, lire, modifier et supprimer ses propres notes de manière sécurisée.

Isolation des Données : Un utilisateur ne peut en aucun cas accéder aux notes d'un autre utilisateur sans autorisation explicite.

Partage Collaboratif :

Mode Lecture seule : Partage d'une note sans droit de modification.

Mode Lecture/Écriture : Partage permettant la modification collaborative.

Gestion des Conflits (Locked Mode) : Pour garantir l'intégrité, l'édition simultanée est protégée par un mécanisme de verrouillage (Optimistic Locking) afin d'éviter l'écrasement accidentel de données.

Résilience du Stockage : Architecture conçue pour fonctionner sur deux serveurs répliquant le stockage des données afin d'assurer une haute disponibilité.

🛡️ Ingénierie de la Sécurité

Le développement suit l'extension du processus agile proposée par Lotfi ben Othmane et al. (2013). Cette approche intègre la sécurité directement dans chaque incrément logiciel produit à la fin de chaque itération.

Security User Stories (SU)

Nous avons utilisé des Security User Stories pour capturer et raffiner nos exigences de protection:

SU-Authentification : Utilisation de jetons JWT pour garantir que seul un utilisateur authentifié accède au système.

SU-Autorisation : Contrôle strict des accès au niveau de la base de données SQL pour empêcher l'accès non autorisé.

SU-Intégrité : Protection contre les attaques de type "Race Condition" lors de l'édition via une gestion de version des notes.

SU-Disponibilité : Architecture logicielle Stateless permettant la réplication sur plusieurs instances de serveurs.

🏗️ Architecture Technique

Frontend : Angular (Application Single Page) offrant une interface utilisateur réactive.

Backend : Serveur Node.js (Stateless) utilisant des middlewares de sécurité pour la validation des requêtes.

Base de données : SQL (PostgreSQL) assurant l'intégrité transactionnelle et la persistance des données.

Sécurité des échanges : Toutes les communications sont authentifiées via JWT, protégeant ainsi le système contre les fuites potentielles et les attaques malveillantes.

🧪 Tests de Sécurité et Robustesse

Conformément à la phase de construction du processus agile sécurisé, l'application a subi des tests de validation spécifiques :

Tests d'Accès : Vérification que l'accès à l'ID d'une note appartenant à autrui est bloqué par le serveur (403 Forbidden).

Tests de Concurrence : Validation que deux éditeurs ne peuvent pas écraser leurs changements respectifs grâce au verrouillage de version (409 Conflict).

Tests de Résilience : Démonstration que le serveur peut être répliqué sans perte de session utilisateur grâce à l'architecture sans état.
