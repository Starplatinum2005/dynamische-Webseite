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
          'INSERT INTO Bestellposition_Produkt (Bestellungs_ID, Artikelnummer, Menge) VALUES (?, ?, ?)',
          [bestellungId, p.Artikelnummer, p.Menge]
        );
      }
    }

  if (kurse && kurse.length > 0) {
      for (const k of kurse) {
        await connection.query(
          'INSERT INTO Bestellposition_Kurs (Bestellungs_ID, Kurs_ID, Anzahl_Teilnehmer) VALUES (?, ?, ?)',
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

exports.getBestellungenByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Get all orders for the user
    const [bestellungen] = await db.query(
      'SELECT * FROM Bestellung WHERE User_ID = ? ORDER BY Bestellungsdatum DESC',
      [userId]
    );

    // For each order, get the products and courses
    const bestellungenMitDetails = await Promise.all(bestellungen.map(async (bestellung) => {
      // Get products from this order
      const [produkte] = await db.query(
        `SELECT p.*, bpp.Menge FROM Produkt p 
         JOIN Bestellposition_Produkt bpp ON p.Artikelnummer = bpp.Artikelnummer 
         WHERE bpp.Bestellungs_ID = ?`,
        [bestellung.Bestellungs_ID]
      );

      // Get courses from this order
      const [kurse] = await db.query(
        `SELECT k.*, bpk.Anzahl_Teilnehmer FROM Kurs k 
         JOIN Bestellposition_Kurs bpk ON k.Kurs_ID = bpk.Kurs_ID 
         WHERE bpk.Bestellungs_ID = ?`,
        [bestellung.Bestellungs_ID]
      );

      return {
        ...bestellung,
        produkte: produkte || [],
        kurse: kurse || []
      };
    }));

    res.json(bestellungenMitDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Laden der Bestellungen' });
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