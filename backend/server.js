const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json()); 

const kursRoutes = require('./routes/kursRoutes');
app.use('/api/kurse', kursRoutes);

const benutzerRoutes = require('./routes/benutzerRoutes');
app.use('/api/benutzer', benutzerRoutes);

const locationRoutes = require('./routes/LocationRoutes');
app.use('/api/locations', locationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend-Server läuft sauber auf http://localhost:${PORT}`);
});