const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/notes',notesRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {console.log(`Server running on port: ${PORT}`)});