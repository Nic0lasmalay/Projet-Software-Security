@echo off
SETLOCAL EnableDelayedExpansion
title 🛡️ Secure Notes App - Diagnostic et Lancement Automatique

:: --- CONFIGURATION DES COULEURS ---
:: 0A = Fond Noir, Texte Vert
color 0A

echo ==========================================================
echo    SYSTEME DE LANCEMENT RESILIENT - GROUPE 1
echo ==========================================================
echo.

:: --- 1. VERIFICATION DE NODE.JS ---
echo [1/5] Verification de l'environnement...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [!] ERREUR : Node.js n'est pas installe ou pas dans le PATH.
    pause
    exit
)
echo [OK] Node.js est present.

:: --- 2. VERIFICATION DU FICHIER .ENV ---
echo [2/5] Verification de la configuration (.env)...
if not exist "SecureNotesApp\back\.env" (
    color 0C
    echo [!] ERREUR : Le fichier SecureNotesApp\back\.env est manquant.
    echo Generez-le avant de continuer.
    pause
    exit
)
echo [OK] Configuration detectee.

:: --- 3. INSTALLATION AUTOMATIQUE DES DEPENDANCES ---
echo [3/5] Verification des dependances (npm install)...

if not exist "SecureNotesApp\back\node_modules\" (
    echo [+] Installation des dependances Backend...
    cd SecureNotesApp\back && call npm install && cd ..
)

if not exist "SecureNotesApp\front\node_modules\" (
    echo [+] Installation des dependances Frontend...
    cd front && call npm install && cd ..
)
echo [OK] Dependances pretes.

:: --- 4. INITIALISATION DE LA BASE DE DONNEES (Optionnel) ---
echo [4/5] Note : Assurez-vous que PostgreSQL est lance.
echo       Base de donnees cible : secure_notes_db.
echo.

:: --- 5. LANCEMENT DE L'ARCHITECTURE ---
echo [5/5] Lancement de l'architecture resiliente...
echo ----------------------------------------------------------
echo Terminal A : Serveur Primaire (Port 3000)
start "BACKEND_3000" cmd /k "cd SecureNotesApp\back && title SERVEUR_3000 && node server.js"

echo Terminal B : Serveur de Secours (Port 3001)
start "BACKEND_3001" cmd /k "cd SecureNotesApp\back && title SERVEUR_3001 && set PORT=3001 && node server.js"

echo Terminal C : Load Balancer (Port 8080)
start "LOAD_BALANCER" cmd /k "cd SecureNotesApp\back && title LOAD_BALANCER && node load-balancer.js"

echo Terminal D : Frontend Angular (Port 4200)
echo [+] Compilation Angular en cours (Veuillez patienter)...
start "FRONTEND_ANGULAR" cmd /k "cd SecureNotesApp\front && title ANGULAR_FRONT && ng serve"

:: --- RECAPITULATIF FINAL ---
echo.
echo ==========================================================
echo         LANCEMENT REUSSI - RECAPITULATIF
echo ==========================================================
echo  - Interface Web : http://localhost:4200
echo  - API (Aiguilleur) : http://localhost:8080
echo.
echo  SCENARIO DE TEST (RESILIENCE) :
echo  Fermez la fenetre "SERVEUR_3000". L'application restera
echo  fonctionnelle via le "SERVEUR_3001".
echo ==========================================================
echo.
pause