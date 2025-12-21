const express = require('express');
const router = express.Router();
const notesController = require('./../controllers/notesController');
const authMiddleWare = require('./../middleware/authMiddleware');

router.get('/', authMiddleWare,notesController.getNotes);
router.post('/',authMiddleWare,notesController.createNote);

module.exports = router;