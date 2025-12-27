const express = require('express');
const router = express.Router();
const notesController = require('./../controllers/notesController');
const authMiddleWare = require('./../middleware/authMiddleware');

router.get('/', authMiddleWare,notesController.getNotes);
router.post('/',authMiddleWare,notesController.createNote);
router.delete('/:id',authMiddleWare,notesController.deleteNote);
router.put('/:id',authMiddleWare,notesController.updateNote);
router.post('/:id/share',authMiddleWare,notesController.shareNote);

module.exports = router;