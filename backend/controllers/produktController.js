const db = require('../config/db');

exports.getAllProdukte = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Produkt');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Laden der Produkte' });
  }
};

exports.createProdukt = async (req, res) => {
  try {
    const { Bezeichnung, Beschreibung, Bestand, Preis } = req.body; 
    
    const sql = 'INSERT INTO Produkt (Bezeichnung, Beschreibung, Bestand, Preis) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(sql, [Bezeichnung, Beschreibung, Bestand, Preis]);
    
    res.status(201).json({ message: 'Produkt erfolgreich angelegt!', Artikelnummer: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Speichern des Produkts' });
  }
};

exports.updateProdukt = async (req, res) => {
  try {
    const artikelnummer = req.params.id;
    const { Bezeichnung, Beschreibung, Bestand, Preis } = req.body; 
    
    const sql = 'UPDATE Produkt SET Bezeichnung = ?, Beschreibung = ?, Bestand = ?, Preis = ? WHERE Artikelnummer = ?';
    const [result] = await db.query(sql, [Bezeichnung, Beschreibung, Bestand, Preis, artikelnummer]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produkt nicht gefunden' });
    }
    res.json({ message: 'Produkt erfolgreich aktualisiert!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren' });
  }
};

exports.deleteProdukt = async (req, res) => {
  try {
    const artikelnummer = req.params.id;
    const [result] = await db.query('DELETE FROM Produkt WHERE Artikelnummer = ?', [artikelnummer]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Produkt nicht gefunden' });
    }
    res.json({ message: 'Produkt erfolgreich gelöscht!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Löschen. (Ist das Produkt evtl. noch in einer Bestellung verknüpft?)' });
  }
};