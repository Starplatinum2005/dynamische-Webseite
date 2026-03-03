const db = require('../config/db');

exports.getAllKurse = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Kurs');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Laden der Kurse' });
  }
};

exports.createKurs = async (req, res) => {
  try {
    const { Titel, Preis, Location_ID } = req.body; 
    
    const sql = 'INSERT INTO Kurs (Titel, Preis, Location_ID) VALUES (?, ?, ?)';
    const [result] = await db.query(sql, [Titel, Preis, Location_ID]);
    
    res.status(201).json({ 
      message: 'Kurs erfolgreich angelegt!', 
      Kurs_ID: result.insertId 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Speichern des Kurses' });
  }
};

exports.updateKurs = async (req, res) => {
  try {
    const kursId = req.params.id; 
    const { Titel, Preis, Location_ID } = req.body; 
    
    const sql = 'UPDATE Kurs SET Titel = ?, Preis = ?, Location_ID = ? WHERE Kurs_ID = ?';
    const [result] = await db.query(sql, [Titel, Preis, Location_ID, kursId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Kurs nicht gefunden' });
    }
    
    res.json({ message: 'Kurs erfolgreich aktualisiert!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Kurses' });
  }
};

exports.deleteKurs = async (req, res) => {
  try {
    const kursId = req.params.id;
    
    const sql = 'DELETE FROM Kurs WHERE Kurs_ID = ?';
    const [result] = await db.query(sql, [kursId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Kurs nicht gefunden' });
    }
    
    res.json({ message: 'Kurs erfolgreich gelöscht!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Löschen des Kurses. (Eventuell gibt es noch Buchungen für diesen Kurs?)' });
  }
};