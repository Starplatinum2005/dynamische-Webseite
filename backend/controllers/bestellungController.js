const db = require('../config/db');

exports.getAllBestellungen = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Bestellung');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Laden der Bestellungen' });
  }
};

exports.createBestellung = async (req, res) => {
  const connection = await db.getConnection(); 
  try {
    await connection.beginTransaction();

    const { Bestellungsdatum, Bestellstatus, User_ID, produkte, kurse } = req.body;

    const [bestellungResult] = await connection.query(
      'INSERT INTO Bestellung (Bestellungsdatum, Bestellstatus, User_ID) VALUES (?, ?, ?)',
      [Bestellungsdatum, Bestellstatus, User_ID]
    );
    const bestellungId = bestellungResult.insertId;

    if (produkte && produkte.length > 0) {
      for (const p of produkte) {
        await connection.query(
          'INSERT INTO Bestellposition_Produkt (Bestellungs_ID_Bestellung, Artikelnummer_Produkt, Menge) VALUES (?, ?, ?)',
          [bestellungId, p.Artikelnummer, p.Menge]
        );
      }
    }

    if (kurse && kurse.length > 0) {
      for (const k of kurse) {
        await connection.query(
          'INSERT INTO Bestellposition_Kurs (Bestellungs_ID_Bestellung, Kurs_ID_Kurs, Anzahl_Teilnehmer) VALUES (?, ?, ?)',
          [bestellungId, k.Kurs_ID, k.Anzahl_Teilnehmer]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ message: 'Bestellung erfolgreich aufgegeben!', Bestellungs_ID: bestellungId });
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Erstellen der Bestellung' });
  } finally {
    connection.release();
  }
};

exports.deleteBestellung = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query('DELETE FROM Bestellung WHERE Bestellungs_ID = ?', [id]);
    res.json({ message: 'Bestellung gelöscht' });
  } catch (error) {
    res.status(500).json({ error: 'Fehler beim Löschen' });
  }
};