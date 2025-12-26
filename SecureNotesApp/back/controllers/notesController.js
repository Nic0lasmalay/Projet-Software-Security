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

exports.deleteNote = async (req,res)=>{
    try{
        const id = req.auth.userId;
        const noteId = req.params.id;
        const result = await db.query(`DELETE FROM notes WHERE owner_id=$1 AND id=$2 RETURNING *`,[id,noteId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Note non trouvée ou non autorisée" });
        }
        res.status(200).json(result.rows);

    }catch(err){
        res.status(500).json({error:"Erreur lors de la suppression de la note : "+err});
    }
}

exports.updateNote = async (req,res)=>{
    try{
        const id = req.auth.userId;
        const noteId = req.params.id;
        const {title,content} = req.body;
        const result = await db.query('UPDATE notes SET title = $1, content =$2 WHERE owner_id=$3 AND id=$4 RETURNING *',[title,content,id,noteId]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Note non trouvée ou non autorisée" });
        }
        res.status(200).json(result.rows[0]);
    }catch (err){
        console.error("ERREUR SQL DÉTAILLÉE :", err.message);
        res.status(500).json({error:"Erreur lors de la mise à jour : ",err});
    }
}