-- 1. ZUERST Rollen anlegen (Wichtig, damit die IDs 1 und 2 existieren!)
INSERT INTO `Rolle` (`Berechtigung`, `Bezeichnung`) VALUES 
('Admin', 'Administrator'),
('User', 'Kunde');

-- 2. Benutzer anlegen (Hier geben wir jetzt direkt die Rollennummer mit!)
INSERT INTO `Benutzer` (`Vorname`, `Nachname`, `Strasse`, `PLZ`, `Ort`, `Email`, `Passwort`, `Rollennummer`) VALUES 
('Max', 'Mustermann', 'Marienstraße 20', '89522', 'Heidenheim', 'max@blueoceandive.de', 'geheim123', 1), -- Max kriegt Rolle 1 (Admin/Tauchlehrer)
('Erika', 'Beispiel', 'Schloßhau 1', '89518', 'Heidenheim', 'erika@tauchfan.de', 'passwort456', 2);  -- Erika kriegt Rolle 2 (Tauchschülerin)

-- Locations anlegen (Für Tauchkurse brauchen wir Pool und See!)
INSERT INTO `Location` (`Strasse`, `PLZ`, `Ort`, `Raumname`) VALUES 
('Hallenbadweg 1', '89518', 'Heidenheim', 'Aquarena Sportbecken'),
('Seestraße 10', '89567', 'Sontheim', 'Baggersee Einstieg Nord');

-- Produkte anlegen (Tauch-Equipment statt Schreibwaren)
INSERT INTO `Produkt` (`Bezeichnung`, `Beschreibung`, `Bestand`, `Preis`) VALUES 
('Taucherbrille Pro', 'Anti-Beschlag-Glas mit weichem Silikonrand', 50, 49.99),
('Neoprenanzug 5mm', 'Warmer Nassanzug für europäische Gewässer', 20, 199.00);

-- Kurse anlegen (verknüpft mit Location_ID)
INSERT INTO `Kurs` (`Titel`, `Teilnehmerobergrenze`, `Zeit_der_Veranstaltung`, `Preis`, `Location_ID`) VALUES 
('Open Water Diver (OWD) Anfängerkurs', 8, '2026-05-10 09:00:00', 399.00, 1), -- Findet im Pool statt (Location 1)
('Advanced Open Water (AOWD) Tieftauchen', 6, '2026-06-15 10:00:00', 299.00, 2); -- Findet im See statt (Location 2)

-- Eine erste Bestellung anlegen
INSERT INTO `Bestellung` (`Bestellungsdatum`, `Bestellstatus`, `User_ID`) VALUES 
('2026-03-03 10:30:00', 'In Bearbeitung', 2);

-- Produkte zur Bestellung hinzufügen (Bestellungs_ID 1)
INSERT INTO `Bestellposition_Produkt` (`Bestellungs_ID`, `Artikelnummer`, `Menge`) VALUES 
(1, 1, 1), -- 1x Taucherbrille
(1, 2, 1); -- 1x Neoprenanzug

-- Kurs zur Bestellung hinzufügen (Bestellungs_ID 1)
INSERT INTO `Bestellposition_Kurs` (`Bestellungs_ID`, `Kurs_ID`, `Anzahl_Teilnehmer`) VALUES 
(1, 1, 1); -- Erika meldet sich ganz alleine für den OWD Anfängerkurs an