const db = require('../config/db');

exports.getAllLocations = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Location');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Laden der Locations' });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const { Strasse, PLZ, Ort, Raum } = req.body; 
    
    const sql = 'INSERT INTO Location (Strasse, PLZ, Ort, Raum) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [Strasse, PLZ, Ort, Raum]);
    
    res.status(201).json({ message: 'Location erfolgreich angelegt!', Location_ID: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Speichern der Location' });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const { Strasse, PLZ, Ort, Raum } = req.body; 
    
    const sql = 'UPDATE Location SET Strasse = ?, PLZ = ?, Ort = ?, Raum = ? WHERE Location_ID = ?';
    const [result] = await db.query(sql, [Strasse, PLZ, Ort, Raum, locationId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Location nicht gefunden' });
    }
    res.json({ message: 'Location erfolgreich aktualisiert!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren' });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const locationId = req.params.id;
    const [result] = await db.query('DELETE FROM Location WHERE Location_ID = ?', [locationId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Location nicht gefunden' });
    }
    res.json({ message: 'Location erfolgreich gelöscht!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Löschen. (Gibt es noch Kurse in dieser Location?)' });
  }
};