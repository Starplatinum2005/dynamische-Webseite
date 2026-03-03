-- Rollen anlegen
INSERT INTO `Rolle` (`Berechtigung`, `Bezeichnung`) VALUES 
('Admin', 'Administrator'),
('User', 'Kunde');

-- Benutzer anlegen (Passwörter sind hier nur Beispiel-Klartext)
INSERT INTO `Benutzer` (`Vorname`, `Nachname`, `Strasse`, `PLZ`, `Ort`, `Email`, `Passwort`) VALUES 
('Max', 'Mustermann', 'Marienstraße 20', '89522', 'Heidenheim', 'max@mustermann.de', 'geheim123'),
('Erika', 'Beispiel', 'Schloßhau 1', '89518', 'Heidenheim', 'erika@web.de', 'passwort456');

-- Locations anlegen
INSERT INTO `Location` (`Strasse`, `PLZ`, `Ort`, `Raumname`) VALUES 
('Marienstraße 20', '89522', 'Heidenheim', 'Labor 1.02'),
('Willy-Brandt-Platz 2', '89522', 'Heidenheim', 'Aula');

-- Produkte anlegen
INSERT INTO `Produkt` (`Bezeichnung`, `Beschreibung`, `Bestand`, `Preis`) VALUES 
('Skizzenblock A4', 'Hochwertiges Papier für Zeichnungen', 50, 4.99),
('Kugelschreiber Blau', 'Dokumentenecht, Mine auswechselbar', 200, 1.50);

-- Benutzern Rollen zuweisen
INSERT INTO `Benutzer_hat_Rolle` (`User_ID`, `Rollennummer`) VALUES 
(1, 1), -- Max ist Admin
(2, 2); -- Erika ist Kunde

-- Kurse anlegen (verknüpft mit Location_ID)
INSERT INTO `Kurs` (`Titel`, `Teilnehmerobergrenze`, `Zeit_der_Veranstaltung`, `Preis`, `Location_ID`) VALUES 
('Datenbanken Basics', 20, '2026-03-10 14:00:00', 0.00, 1),
('Excel für Fortgeschrittene', 15, '2026-04-15 09:00:00', 49.95, 2);

-- Eine erste Bestellung anlegen
INSERT INTO `Bestellung` (`Bestellungsdatum`, `Bestellstatus`, `User_ID`) VALUES 
('2026-03-03 10:30:00', 'In Bearbeitung', 2);

-- Produkte zur Bestellung hinzufügen (Bestellungs_ID 1)
INSERT INTO `Bestellposition_Produkt` (`Bestellungs_ID`, `Artikelnummer`, `Menge`) VALUES 
(1, 1, 2), -- 2x Skizzenblock
(1, 2, 5); -- 5x Kuli

-- Kurs zur Bestellung hinzufügen (Bestellungs_ID 1)
INSERT INTO `Bestellposition_Kurs` (`Bestellungs_ID`, `Kurs_ID`, `Anzahl_Teilnehmer`) VALUES 
(1, 1, 1); -- Erika meldet sich für Datenbanken an