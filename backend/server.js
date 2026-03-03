const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'BOD_Nutzer',
  password: 'BlueOD_WwI02040A_',
  database: 'Datenbank'
});

db.connect((err) => {
  if (err) {
    console.error('Fehler bei der Datenbankverbindung:', err);
    return;
  }
  console.log('Erfolgreich mit der MariaDB verbunden!');
});

app.get('/api/kurse', (req, res) => {
  db.query('SELECT * FROM Kurs', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Backend-Server läuft auf http://localhost:3000');
});