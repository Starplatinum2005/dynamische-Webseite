const db = require('../config/db');

exports.getAllRollen = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Rolle');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden der Rollen' });
  }
};

exports.createRolle = async (req, res) => {
  try {
    const { Berechtigung, Bezeichnung } = req.body;
    const [result] = await db.query(
      'INSERT INTO Rolle (Berechtigung, Bezeichnung) VALUES (?, ?)', 
      [Berechtigung, Bezeichnung]
    );
    res.status(201).json({ message: 'Rolle erfolgreich angelegt!', Rollennummer: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Speichern der Rolle' });
  }
};

exports.updateRolle = async (req, res) => {
  try {
    const id = req.params.id;
    const { Berechtigung, Bezeichnung } = req.body;
    await db.query(
      'UPDATE Rolle SET Berechtigung = ?, Bezeichnung = ? WHERE Rollennummer = ?', 
      [Berechtigung, Bezeichnung, id]
    );
    res.json({ message: 'Rolle aktualisiert!' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Aktualisieren' });
  }
};

exports.deleteRolle = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query('DELETE FROM Rolle WHERE Rollennummer = ?', [id]);
    res.json({ message: 'Rolle gelöscht!' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Löschen' });
  }
};