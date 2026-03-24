CREATE OR REPLACE TABLE `Benutzer` (
    `User_ID` INTEGER AUTO_INCREMENT,
    `Vorname` VARCHAR(255) NOT NULL,
    `Nachname` VARCHAR(255) NOT NULL,
    `Strasse` VARCHAR(255),
    `PLZ` VARCHAR(20),
    `Ort` VARCHAR(255),
    `Email` VARCHAR(255) NOT NULL UNIQUE CHECK (`Email` LIKE '%@%.%'), 
    `Passwort` VARCHAR(255) NOT NULL, 
    `Rollennummer` INTEGER NOT NULL,
    PRIMARY KEY(`User_ID`)
);

CREATE OR REPLACE TABLE `Rolle` (
    `Rollennummer` INTEGER AUTO_INCREMENT,
    `Berechtigung` VARCHAR(255) NOT NULL,
    `Bezeichnung` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`Rollennummer`)
);

CREATE OR REPLACE TABLE `Location` (
    `Location_ID` INTEGER AUTO_INCREMENT,
    `Strasse` VARCHAR(255),
    `PLZ` VARCHAR(20),
    `Ort` VARCHAR(255),
    `Raumname` VARCHAR(255),
    PRIMARY KEY(`Location_ID`)
);

CREATE OR REPLACE TABLE `Kurs` (
    `Kurs_ID` INTEGER AUTO_INCREMENT,
    `Titel` VARCHAR(255) NOT NULL,
    `Teilnehmerobergrenze` INTEGER CHECK (`Teilnehmerobergrenze` > 0),
    `Zeit_der_Veranstaltung` DATETIME NOT NULL,
    `Preis` DECIMAL(10,2) CHECK (`Preis` >= 0),
    `Location_ID` INTEGER,
    PRIMARY KEY(`Kurs_ID`)
);

CREATE OR REPLACE TABLE `Produkt` (
    `Artikelnummer` INTEGER AUTO_INCREMENT,
    `Bezeichnung` VARCHAR(255) NOT NULL,
    `Beschreibung` TEXT,
    `Bestand` INTEGER NOT NULL CHECK (`Bestand` >= 0), 
    `Preis` DECIMAL(10,2) NOT NULL CHECK (`Preis` >= 0),               
    `Bildpfad` VARCHAR(255) NOT NULL DEFAULT '/placeholder.png', 
    `Bestseller` TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY(`Artikelnummer`)
);

CREATE OR REPLACE TABLE `Bestellung` (
    `Bestellungs_ID` INTEGER AUTO_INCREMENT,
    `Bestellungsdatum` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `Bestellstatus` VARCHAR(50) NOT NULL CHECK (`Bestellstatus` IN ('In Bearbeitung', 'Versendet', 'Abgeschlossen', 'Storniert')),
    `User_ID` INTEGER NOT NULL,
    PRIMARY KEY(`Bestellungs_ID`)
);

CREATE OR REPLACE TABLE `Bestellposition_Produkt` (
    `Bestellungs_ID` INTEGER,
    `Artikelnummer` INTEGER,
    `Menge` INTEGER NOT NULL CHECK (`Menge` > 0),
    PRIMARY KEY(`Bestellungs_ID`, `Artikelnummer`)
);

CREATE OR REPLACE TABLE `Bestellposition_Kurs` (
    `Bestellungs_ID` INTEGER,
    `Kurs_ID` INTEGER,
    `Anzahl_Teilnehmer` INTEGER NOT NULL CHECK (`Anzahl_Teilnehmer` > 0),
    PRIMARY KEY(`Bestellungs_ID`, `Kurs_ID`)
);

ALTER TABLE `Benutzer`
ADD FOREIGN KEY(`Rollennummer`) REFERENCES `Rolle`(`Rollennummer`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Kurs`
ADD FOREIGN KEY(`Location_ID`) REFERENCES `Location`(`Location_ID`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Bestellung`
ADD FOREIGN KEY(`User_ID`) REFERENCES `Benutzer`(`User_ID`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Bestellposition_Produkt`
ADD FOREIGN KEY(`Bestellungs_ID`) REFERENCES `Bestellung`(`Bestellungs_ID`)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE `Bestellposition_Produkt`
ADD FOREIGN KEY(`Artikelnummer`) REFERENCES `Produkt`(`Artikelnummer`)
ON UPDATE CASCADE ON DELETE RESTRICT;

ALTER TABLE `Bestellposition_Kurs`
ADD FOREIGN KEY(`Bestellungs_ID`) REFERENCES `Bestellung`(`Bestellungs_ID`)
ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE `Bestellposition_Kurs`
ADD FOREIGN KEY(`Kurs_ID`) REFERENCES `Kurs`(`Kurs_ID`)
ON UPDATE CASCADE ON DELETE RESTRICT;

DELIMITER $$
CREATE TRIGGER check_kurs_kapazitaet
BEFORE INSERT ON `Bestellposition_Kurs`
FOR EACH ROW
BEGIN    
    DECLARE aktuelle_teilnehmer INTEGER;    
    DECLARE max_teilnehmer INTEGER;    
    
    SELECT COALESCE(SUM(bk.Anzahl_Teilnehmer), 0)    
    INTO aktuelle_teilnehmer    
    FROM Bestellposition_Kurs bk    
    WHERE bk.Kurs_ID = NEW.Kurs_ID;    
    
    SELECT Teilnehmerobergrenze    
    INTO max_teilnehmer    
    FROM Kurs    
    WHERE Kurs_ID = NEW.Kurs_ID;    
    
    IF max_teilnehmer IS NOT NULL AND (aktuelle_teilnehmer + NEW.Anzahl_Teilnehmer) > max_teilnehmer THEN        
        SIGNAL SQLSTATE '45000'        
        SET MESSAGE_TEXT = 'Kursbelegung überschreitet die Teilnehmerobergrenze';    
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER check_kurs_kapazitaet_update
BEFORE UPDATE ON `Bestellposition_Kurs`
FOR EACH ROW
BEGIN    
    DECLARE aktuelle_teilnehmer INTEGER;    
    DECLARE max_teilnehmer INTEGER;    
    
    SELECT COALESCE(SUM(bk.Anzahl_Teilnehmer), 0)    
    INTO aktuelle_teilnehmer    
    FROM Bestellposition_Kurs bk    
    WHERE bk.Kurs_ID = NEW.Kurs_ID      
      AND bk.Bestellungs_ID != NEW.Bestellungs_ID;    
    
    SELECT Teilnehmerobergrenze    
    INTO max_teilnehmer    
    FROM Kurs    
    WHERE Kurs_ID = NEW.Kurs_ID;    
    
    IF max_teilnehmer IS NOT NULL AND (aktuelle_teilnehmer + NEW.Anzahl_Teilnehmer) > max_teilnehmer THEN        
        SIGNAL SQLSTATE '45000'        
        SET MESSAGE_TEXT = 'Kursbelegung überschreitet die Teilnehmerobergrenze';    
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER check_kurs_datum
BEFORE INSERT ON `Kurs`
FOR EACH ROW
BEGIN    
    IF NEW.Zeit_der_Veranstaltung <= NOW() THEN        
        SIGNAL SQLSTATE '45000'        
        SET MESSAGE_TEXT = 'Veranstaltungsdatum muss in der Zukunft liegen';    
    END IF;
END$$
DELIMITER ;