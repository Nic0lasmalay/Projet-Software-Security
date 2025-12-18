const{Pool} = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect',()=>{
    console.log('Connecté à la base de données PostgreSQL');
});

// Exportation d'une méthode de requête sécurisée
module.exports={
    /**
     * Méthode pour exécuter des requêtes SQL
     * Utilise systématiquement des "Prepared Statements" pour contrer l'injection SQL
     */
    query: (text, params) => pool.query(text, params),
};

