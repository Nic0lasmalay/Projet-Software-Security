const db = require("./../config/db");

exports.getNotes=async (req,res)=>{
    try{
        const id = req.auth.userId;
        const result = await db.query(`SELECT n.*, true AS user_can_edit 
            FROM notes n 
            WHERE n.owner_id = $1
            UNION 
            SELECT n.*, ns.can_edit AS user_can_edit
            FROM notes n 
            JOIN note_shares ns ON n.id = ns.note_id 
            WHERE ns.user_id = $1`,[id]);
        res.status(200).json(result.rows);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Erreur lors de l'accès aux notes"});
    }

};

exports.createNote = async (req,res)=>{
    try{
        const id = req.auth.userId;
        const body = req.body;
        const result = await db.query('INSERT INTO notes (title,content,owner_id) VALUES($1,$2,$3) RETURNING *',[body.title,body.content,id]);
        res.status(201).json(result.rows[0]);
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Erreur lors de la création de la note"});
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
        console.log(err);
        res.status(500).json({error:"Erreur lors de la suppression de la note "});
    }
}

exports.updateNote = async (req,res)=>{
    try{
        const id = req.auth.userId;
        const noteId = req.params.id;
        const {title,content,version} = req.body;
        const result = await db.query('UPDATE notes SET title = $1, content =$2, version = version + 1 WHERE id=$4 AND version = $5 AND (owner_id=$3 OR EXISTS (SELECT 1 FROM note_shares WHERE note_id=$4 AND user_id=$3 AND can_edit=true)) RETURNING *',[title,content,id,noteId,version]);

        if (result.rowCount === 0) {
            const checkExist = await db.query('SELECT * FROM notes WHERE id = $1',[noteId]);
            if(checkExist.rowCount>0 && checkExist.rows[0].version!==version){
                return res.status(409).json({ error: "Conflit : La note a été modifiée par quelqu'un d'autre." });
            }
            else return res.status(403).json({ error: "Action non autorisée ou note introuvable." });
        }
        res.status(200).json(result.rows[0]);
    }catch (err){
        console.error("ERREUR SQL DÉTAILLÉE :", err.message);
        console.log(err);
        res.status(500).json({error:"Erreur lors de la mise à jour"});
    }
}
exports.shareNote = async (req,res)=>{
    try{
        const id = req.auth.userId;
        const noteId = req.params.id;
        const {username,canEdit} = req.body;

        const check1 = await db.query('SELECT * FROM notes WHERE owner_id=$1 AND id=$2',[id,noteId]);

        if(check1.rowCount===0){
            res.status(403).json({error:"Action non autorisée"})
        }

        const check2 = await db.query('SELECT * FROM users WHERE username=$1',[username]);
        if(check2.rowCount===0){
            return res.status(404).json({error:"Utlisateur introuvable"});
        }

        const userId = check2.rows[0].id;

        if(userId===id){
            res.status(400).json({error:"Vous ne pouvez pas vous partager une note à vous même"});
        }

        await db.query('INSERT INTO note_shares (note_id,user_id,can_edit) VALUES($1,$2,$3) ON CONFLICT (note_id,user_id) DO UPDATE SET can_edit=$3',[noteId,userId,canEdit]);

        res.status(200).json({message:"Permission accordée à ",username});

    }catch(err){
        console.log(err);
        res.status(500).json({error:"Erreur interne lors de l'accord de permission"});
    }
}