const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');

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
        console.log(err);
        res.status(500).json({error:'Erreur Serveur :'+err.message});
    }
}

exports.login = async (req, res) => {
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({error:"Champs Manquants"});
    }
    try{
        const result = await db.query('SELECT * FROM users WHERE username=$1', [username]);
        if(result.rows.length===0){
            return res.status(401).json({error: "Identifiants invalides"});
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch){
            return res.status(401).json({error:"Identifiants invalides"});
        }
        const token = jwt.sign(
            {userId:user.id,username:user.username},
            process.env.JWT_SECRET,
            {expiresIn: '24h'});

        res.status(200).json({
            message: 'Connexion réussie',
            token: token,
            user: { id: user.id, username: user.username }
        })
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Erreur Serveur :'+err.message});
    }
}