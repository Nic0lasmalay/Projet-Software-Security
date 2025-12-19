const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.register = async (req, res) => {
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({error:"Champs Manquants"});
    }
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO users (username,password_hash) VALUES ($1,$2) RETURNING id, username',
            [username, hashedPassword]
        );
        res.status(201).json({message: 'Utilisateur créé',user:result.rows[0]});
    }catch (err){
        res.status(500).json({error:'Erreur Serveur :'+err.message});
    }
}