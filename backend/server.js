const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json()); 

const kursRoutes = require('./routes/kursRoutes');
app.use('/api/kurse', kursRoutes);

const benutzerRoutes = require('./routes/BenutzerRoutes');
app.use('/api/benutzer', benutzerRoutes);

const locationRoutes = require('./routes/LocationRoutes');
app.use('/api/locations', locationRoutes);

const produktRoutes = require('./routes/produktRoutes');
app.use('/api/produkte', produktRoutes);

const bestellungRoutes = require('./routes/bestellungRoutes');
app.use('/api/bestellungen', bestellungRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend-Server läuft auf http://localhost:${PORT}`);
});