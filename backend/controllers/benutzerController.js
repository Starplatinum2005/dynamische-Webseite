const db = require('../config/db');

exports.getAllBenutzer = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Benutzer');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden der Benutzer' });
  }
};

exports.createBenutzer = async (req, res) => {
  try {
    const { Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort } = req.body; 
    
    const sql = 'INSERT INTO Benutzer (Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort]);
    
    res.status(201).json({ message: 'Benutzer erfolgreich angelegt!', User_ID: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Speichern des Benutzers' });
  }
};

exports.updateBenutzer = async (req, res) => {
  try {
    const userId = req.params.id;
    const { Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort } = req.body; 
    
    const sql = 'UPDATE Benutzer SET Vorname = ?, Nachname = ?, Strasse = ?, PLZ = ?, Ort = ?, Email = ?, Passwort = ? WHERE User_ID = ?';
    const [result] = await db.query(sql, [Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort, userId]);
    
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    res.json({ message: 'Benutzer erfolgreich aktualisiert!' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Aktualisieren' });
  }
};

exports.deleteBenutzer = async (req, res) => {
  try {
    const userId = req.params.id;
    const [result] = await db.query('DELETE FROM Benutzer WHERE User_ID = ?', [userId]);
    
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    res.json({ message: 'Benutzer erfolgreich gelöscht!' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Löschen. (Hat der User evtl. noch Bestellungen?)' });
  }
};