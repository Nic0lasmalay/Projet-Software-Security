const db = require('./db')

async function test(){
    try{
        const res= await db.query('SELECT NOW()');
        console.log('Succès, heure de serveur SQL :',res.rows[0].now);
        process.exit(0);
    }catch(err){
        console.error('Erreur de connexion SQL :',err);
        process.exit(1);
    }
}
test();