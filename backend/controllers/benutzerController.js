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
    const { Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort, Rollennummer } = req.body; 
    
    const sql = 'INSERT INTO Benutzer (Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort, Rollennummer) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(sql, [Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort, Rollennummer]);
    
    res.status(201).json({ message: 'Benutzer erfolgreich angelegt!', User_ID: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Speichern des Benutzers' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, passwort } = req.body;

    const sql = 'SELECT * FROM Benutzer WHERE Email = ? AND Passwort = ?';
    const [rows] = await db.query(sql, [email, passwort]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Falsche E-Mail oder falsches Passwort' });
    }

    const user = rows[0];
    res.json({
      message: 'Erfolgreich eingeloggt',
      user: {
        id: user.User_ID,
        vorname: user.Vorname,
        nachname: user.Nachname,
        email: user.Email,
        rolle: user.Rollennummer 
      }
    });

  } catch (error) {
    console.error("Fehler beim Login:", error);
    res.status(500).json({ error: 'Serverfehler beim Login' });
  }
};

exports.updateBenutzer = async (req, res) => {
  try {
    const userId = req.params.id;
    const { Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort, Rollennummer } = req.body; 
    
    const sql = 'UPDATE Benutzer SET Vorname = ?, Nachname = ?, Strasse = ?, PLZ = ?, Ort = ?, Email = ?, Passwort = ?, Rollennummer = ? WHERE User_ID = ?';
    const [result] = await db.query(sql, [Vorname, Nachname, Strasse, PLZ, Ort, Email, Passwort, Rollennummer, userId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
    res.json({ message: 'Benutzer erfolgreich aktualisiert!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren' });
  }
};

exports.deleteBenutzer = async (req, res) => {
  try {
    const userId = req.params.id;
    const [result] = await db.query('DELETE FROM Benutzer WHERE User_ID = ?', [userId]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }
    res.json({ message: 'Benutzer erfolgreich gelöscht!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Löschen' });
  }
};