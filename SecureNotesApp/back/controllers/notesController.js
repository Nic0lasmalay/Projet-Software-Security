const db = require("./../config/db");

exports.getNotes=async (req,res)=>{
    try{
        const id = req.auth.userId;
        const result = await db.query(`SELECT * FROM notes WHERE owner_id=$1`,[id]);
        res.status(200).json(result.rows);
    }catch(err){
        res.status(500).json({error:"Erreur lors de l'accès aux notes : "+err});
    }

};

exports.createNote = async (req,res)=>{
    try{
        const id = req.auth.userId;
        const body = req.body;
        const result = await db.query('INSERT INTO notes (title,content,owner_id) VALUES($1,$2,$3) RETURNING *',[body.title,body.content,id]);
        res.status(201).json(result.rows[0]);
    }catch(err){
        res.status(500).json({error:"Erreur lors de la création de la note : "+err});
    }
}